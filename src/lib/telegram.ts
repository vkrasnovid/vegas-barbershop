export interface BookingData {
  name: string;
  phone: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  message: string;
}

function formatBookingMessage(data: BookingData): string {
  return [
    '✂️ <b>Новая запись</b>',
    '',
    `👤 Имя: <b>${escapeHTML(data.name)}</b>`,
    `📞 Телефон: <b>${escapeHTML(data.phone)}</b>`,
    `💇‍♂️ Услуга: <b>${escapeHTML(data.service)}</b>`,
    `🧔 Барбер: <b>${escapeHTML(data.barber)}</b>`,
    `📅 Дата: <b>${escapeHTML(data.date)}</b>`,
    `🕐 Время: <b>${escapeHTML(data.time)}</b>`,
    ...(data.message ? [`💬 Комментарий: ${escapeHTML(data.message)}`] : []),
  ].join('\n');
}

function escapeHTML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function sendBookingNotification(data: BookingData): Promise<void> {
  const BOT_TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = import.meta.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    throw new Error('Telegram Bot Token or Chat ID not configured');
  }

  const message = formatBookingMessage(data);

  // Retry with exponential backoff (3 attempts)
  const MAX_RETRIES = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
          }),
          signal: AbortSignal.timeout(10000),
        }
      );

      const result = await response.json();

      if (!result.ok) {
        throw new Error(`Telegram API error: ${result.description || 'Unknown error'}`);
      }

      return; // Success
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      if (attempt < MAX_RETRIES) {
        // Exponential backoff: 1s, 2s, 4s
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)));
      }
    }
  }

  throw lastError || new Error('Failed to send notification after retries');
}
