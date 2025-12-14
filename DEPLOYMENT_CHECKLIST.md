# ✅ قائمة التحقق - الرفع على Vercel

## تم التحديث إلى PostgreSQL ✅

### الملفات المعدلة:
- [x] `web-backend/src/config/database.ts` - تحويل إلى PostgreSQL
- [x] `web-backend/package.json` - استبدال sqlite3 بـ pg
- [x] `web-backend/src/server.ts` - دعم Vercel Serverless
- [x] `web-backend/api/index.ts` - Entry point للـ Vercel
- [x] `web-backend/sql/schema.sql` - Schema لـ PostgreSQL
- [x] `web-backend/.env.example` - مثال لمتغيرات البيئة
- [x] `vercel.json` - إعدادات Vercel
- [x] `.vercelignore` - استبعاد الملفات غير المطلوبة
- [x] `README.md` - تحديث الوثائق
- [x] `VERCEL_DEPLOYMENT.md` - دليل الرفع الكامل

---

## خطوات الرفع السريعة:

### 1. تثبيت التبعيات الجديدة
```bash
cd web-backend
npm install
```

### 2. إنشاء قاعدة بيانات PostgreSQL
اختر واحدة:
- ✅ **Vercel Postgres** (موصى به) - مدمج مع Vercel
- ✅ **Neon.tech** - مجاني وسريع
- ✅ **Supabase** - مجاني مع أدوات إضافية

### 3. تنفيذ Schema
```sql
-- نفذ محتوى هذا الملف على قاعدة البيانات:
web-backend/sql/schema.sql
```

### 4. رفع على GitHub
```bash
git add .
git commit -m "Convert to PostgreSQL and prepare for Vercel"
git push origin main
```

### 5. الرفع على Vercel

#### الطريقة الأولى: عبر الموقع
1. اذهب إلى https://vercel.com
2. اضغط "New Project"
3. اختر Repository
4. أضف Environment Variables:
   - `POSTGRES_URL` = رابط قاعدة البيانات
   - `VITE_API_BASE_URL` = https://your-app.vercel.app/api
5. Deploy!

#### الطريقة الثانية: عبر CLI
```bash
npm install -g vercel
vercel
```

---

## Environment Variables المطلوبة:

### Backend:
```
POSTGRES_URL=postgresql://username:password@host:5432/database
NODE_ENV=production
```

### Frontend:
```
VITE_API_BASE_URL=https://your-app-name.vercel.app/api
```

---

## بعد الرفع:

### اختبار الـ API:
```
https://your-app.vercel.app/health
https://your-app.vercel.app/api/kpis
```

### اختبار Frontend:
```
https://your-app.vercel.app
```

---

## 🔧 للتطوير المحلي مع PostgreSQL:

1. **تثبيت PostgreSQL محلياً** أو استخدم Docker:
```bash
docker run --name postgres-dw -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

2. **إنشاء قاعدة البيانات**:
```bash
createdb data_warehouse
psql data_warehouse -f web-backend/sql/schema.sql
```

3. **ملف .env للـ Backend**:
```env
NODE_ENV=development
PORT=3000
POSTGRES_URL=postgresql://postgres:password@localhost:5432/data_warehouse
```

4. **تشغيل المشروع**:
```bash
# Backend
cd web-backend
npm run dev

# Frontend (terminal جديد)
cd web-frontend
npm run dev
```

---

## ✅ للتحقق من نجاح التحويل:

- [ ] تم تثبيت `pg` بدلاً من `sqlite3`
- [ ] ملف `database.ts` يستخدم Pool من pg
- [ ] تم إنشاء `schema.sql`
- [ ] تم تحديث `vercel.json`
- [ ] تم إنشاء `.env.example`
- [ ] تم اختبار الاتصال بـ PostgreSQL محلياً (اختياري)
- [ ] تم رفع الكود على GitHub
- [ ] تم إنشاء قاعدة بيانات PostgreSQL
- [ ] تم تنفيذ schema.sql
- [ ] تم إضافة Environment Variables في Vercel
- [ ] تم Deploy المشروع
- [ ] تم اختبار الموقع

---

## 📞 للدعم:

راجع: **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** للتفاصيل الكاملة

---

**جاهز للرفع! 🚀**
