# دليل رفع المشروع على Vercel

## الخطوات:

### 1. تثبيت Vercel CLI (اختياري)
```bash
npm install -g vercel
```

### 2. الرفع عبر موقع Vercel (الطريقة الأسهل)

1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل دخول باستخدام حساب GitHub/GitLab/Bitbucket
3. اضغط على "Add New Project"
4. اختر المجلد أو ارفع الكود من Git
5. Vercel سيكتشف الإعدادات تلقائياً

### 3. الرفع عبر CLI
```bash
cd c:\Users\mahmoud\Downloads\Compressed\DW-Backend-main_2\DW-Backend-main
vercel
```

## متغيرات البيئة المطلوبة:

في لوحة تحكم Vercel، أضف المتغيرات التالية:

### للـ Backend:
- `NODE_ENV=production`
- `PORT=3000`
- `DB_PATH=./data/data-warehouse.db` (أو رابط قاعدة بيانات خارجية)

### للـ Frontend:
- `VITE_API_BASE_URL=https://your-vercel-app.vercel.app/api`

## ملاحظات مهمة:

### قاعدة البيانات SQLite:
⚠️ **تنبيه**: Vercel Serverless لا يدعم SQLite بشكل دائم. لديك خيارات:

1. **استخدام قاعدة بيانات خارجية** (الأفضل للإنتاج):
   - PostgreSQL (مثل [Neon](https://neon.tech) أو [Supabase](https://supabase.com))
   - MySQL
   - MongoDB

2. **استخدام Vercel Postgres**:
   ```bash
   vercel postgres create
   ```

3. **استخدام Vercel KV أو Storage** للبيانات الثابتة

### بديل: رفع Backend على منصة أخرى
- **Backend**: Render.com أو Railway.app (يدعمون SQLite)
- **Frontend**: Vercel

## هيكل المشروع للـ Vercel:

```
DW-Backend-main/
├── vercel.json          ✅ تم إنشاؤه
├── .vercelignore        ✅ تم إنشاؤه
├── web-backend/
│   ├── src/
│   ├── data/
│   └── package.json
└── web-frontend/
    ├── src/
    ├── dist/            (يتم إنشاؤه عند البناء)
    └── package.json
```

## بعد الرفع:

1. الـ Frontend سيكون على: `https://your-project.vercel.app`
2. الـ API سيكون على: `https://your-project.vercel.app/api`

## حل المشاكل:

- إذا فشل البناء، تحقق من الـ Build Logs في Vercel
- تأكد من تحديث `VITE_API_BASE_URL` في Frontend
- تحقق من أن جميع التبعيات موجودة في `package.json`

## للدعم الكامل SQLite:

أنصح باستخدام:
- **Frontend**: Vercel ✅
- **Backend**: [Render.com](https://render.com) (مجاني ويدعم SQLite)

ثم قم بتحديث `VITE_API_BASE_URL` ليشير إلى رابط Render.
