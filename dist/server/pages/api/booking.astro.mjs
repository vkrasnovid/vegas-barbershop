export { renderers } from '../../renderers.mjs';

function validateName(name) {
  const trimmed = name.trim();
  if (!trimmed) return "Укажите ваше имя";
  if (trimmed.length < 2) return "Имя должно содержать минимум 2 символа";
  if (trimmed.length > 50) return "Имя не должно превышать 50 символов";
  if (/[0-9]/.test(trimmed)) return "Имя не должно содержать цифры";
  if (/[^а-яёА-ЯЁa-zA-Z\s-]/.test(trimmed)) return "Имя содержит недопустимые символы";
  return null;
}
function validatePhone(phone) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "Укажите номер телефона";
  if (digits.length < 11) return "Номер должен содержать 11 цифр";
  if (digits.length > 11) return "Номер содержит слишком много цифр";
  if (!digits.startsWith("7")) return "Номер должен начинаться с +7";
  return null;
}
function validateService(service) {
  if (!service || service === "") return "Выберите услугу";
  return null;
}
function validateDate(date) {
  if (!date) return "Укажите дату";
  const selected = /* @__PURE__ */ new Date(date + "T00:00:00");
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  if (selected < today) return "Дата не может быть в прошлом";
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 30);
  if (selected > maxDate) return "Можно записаться максимум на 30 дней вперёд";
  return null;
}
function validateTime(time) {
  if (!time) return "Укажите время";
  return null;
}
function validateMessage(message) {
  if (message && message.length > 200) return "Комментарий не должен превышать 200 символов";
  return null;
}
function validateAll(data) {
  const errors = {};
  const nameErr = validateName(data.name);
  if (nameErr) errors.name = nameErr;
  const phoneErr = validatePhone(data.phone);
  if (phoneErr) errors.phone = phoneErr;
  const serviceErr = validateService(data.service);
  if (serviceErr) errors.service = serviceErr;
  const dateErr = validateDate(data.date);
  if (dateErr) errors.date = dateErr;
  const timeErr = validateTime(data.time);
  if (timeErr) errors.time = timeErr;
  const msgErr = validateMessage(data.message);
  if (msgErr) errors.message = msgErr;
  return errors;
}

async function sendBookingNotification(data) {
  {
    throw new Error("Telegram Bot Token or Chat ID not configured");
  }
}

const rateLimitMap = /* @__PURE__ */ new Map();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 6e4;
function checkRateLimit(ip) {
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
const prerender = false;
const POST = async ({ request }) => {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Слишком много попыток. Пожалуйста, попробуйте через минуту."
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: "Некорректный формат данных" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const data = {
      name: typeof body.name === "string" ? body.name.trim() : "",
      phone: typeof body.phone === "string" ? body.phone.trim() : "",
      service: typeof body.service === "string" ? body.service : "",
      barber: typeof body.barber === "string" ? body.barber : "Любой",
      date: typeof body.date === "string" ? body.date : "",
      time: typeof body.time === "string" ? body.time : "",
      message: typeof body.message === "string" ? body.message.trim() : ""
    };
    const errors = validateAll(data);
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors).find(Boolean) || "Проверьте правильность заполнения полей";
      return new Response(
        JSON.stringify({
          success: false,
          error: firstError,
          fields: errors
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    await sendBookingNotification(data);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Заявка успешно отправлена! Мы свяжемся с вами для подтверждения."
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Booking API error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже."
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
