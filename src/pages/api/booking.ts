import type { APIRoute } from 'astro';
import { validateAll } from '../../lib/validation';
import { sendBookingNotification } from '../../lib/telegram';

// Simple in-memory rate limiter: max 5 requests per IP per 60 seconds
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Get client IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

    // Rate limit check
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Слишком много попыток. Пожалуйста, попробуйте через минуту.',
        }),
        {
          status: 429,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Parse request body
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: 'Некорректный формат данных' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Extract and sanitize fields
    const data = {
      name: typeof body.name === 'string' ? body.name.trim() : '',
      phone: typeof body.phone === 'string' ? body.phone.trim() : '',
      service: typeof body.service === 'string' ? body.service : '',
      barber: typeof body.barber === 'string' ? body.barber : 'Любой',
      date: typeof body.date === 'string' ? body.date : '',
      time: typeof body.time === 'string' ? body.time : '',
      message: typeof body.message === 'string' ? body.message.trim() : '',
    };

    // Server-side validation
    const errors = validateAll(data);

    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors).find(Boolean) || 'Проверьте правильность заполнения полей';
      return new Response(
        JSON.stringify({
          success: false,
          error: firstError,
          fields: errors,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Send notification to Telegram
    await sendBookingNotification(data);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Заявка успешно отправлена! Мы свяжемся с вами для подтверждения.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Booking API error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
