# دليل رفع المشروع على Vercel مع PostgreSQL

## ✅ تم التحديث: المشروع الآن يستخدم PostgreSQL!

## التغييرات المطبقة:

### Backend:
- ✅ تحويل من SQLite إلى PostgreSQL
- ✅ استخدام مكتبة `pg` بدلاً من `sqlite3`
- ✅ إضافة Connection Pool للأداء الأفضل
- ✅ دعم Vercel Serverless Functions
- ✅ إنشاء ملف `schema.sql` لبناء قاعدة البيانات

### Frontend:
- ✅ جاهز للرفع مباشرة
- ✅ يستخدم Vite للبناء السريع

---

## خطوات الرفع على Vercel:

### 1️⃣ إنشاء قاعدة بيانات PostgreSQL

#### الخيار الأول: Vercel Postgres (موصى به)

1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل دخول أو أنشئ حساب
3. من Dashboard، اضغط على **Storage** → **Create Database**
4. اختر **Postgres** → **Continue**
5. اختر اسم قاعدة البيانات والمنطقة (Region)
6. اضغط **Create**

#### الخيار الثاني: Neon.tech (مجاني وممتاز)

1. اذهب إلى [neon.tech](https://neon.tech)
2. سجل دخول وأنشئ مشروع جديد
3. انسخ Connection String (DATABASE_URL)

#### الخيار الثالث: Supabase (مجاني أيضاً)

1. اذهب إلى [supabase.com](https://supabase.com)
2. أنشئ مشروع جديد
3. اذهب إلى Settings → Database
4. انسخ Connection String

---

### 2️⃣ إعداد قاعدة البيانات

بعد إنشاء قاعدة البيانات، قم بتشغيل السكربت لإنشاء الجداول:

```sql
-- افتح SQL Editor في Vercel/Neon/Supabase ونفذ محتوى ملف:
web-backend/sql/schema.sql
```

أو استخدم CLI:

```bash
# إذا كنت تستخدم psql
psql "YOUR_DATABASE_URL" -f web-backend/sql/schema.sql
```

---

### 3️⃣ رفع المشروع على Vercel

#### الطريقة الأولى: عبر GitHub (موصى به)

1. ارفع الكود على GitHub:
```bash
git add .
git commit -m "Convert to PostgreSQL for Vercel deployment"
git push origin main
```

2. اذهب إلى [vercel.com](https://vercel.com)
3. اضغط **Add New** → **Project**
4. اختر repository من GitHub
5. Vercel سيكتشف الإعدادات تلقائياً
6. اضغط **Deploy**

#### الطريقة الثانية: عبر Vercel CLI

```bash
# تثبيت Vercel CLI
npm install -g vercel

# الرفع
cd c:\Users\mahmoud\Downloads\Compressed\DW-Backend-main_2\DW-Backend-main
vercel
```

---

### 4️⃣ إضافة متغيرات البيئة (Environment Variables)

بعد رفع المشروع، أضف المتغيرات التالية في Vercel Dashboard:

#### للـ Backend (Settings → Environment Variables):

| المتغير | القيمة | الوصف |
|---------|--------|-------|
| `POSTGRES_URL` | `postgresql://user:pass@host/db` | رابط قاعدة البيانات من Vercel/Neon/Supabase |
| `NODE_ENV` | `production` | بيئة التشغيل |

**ملاحظة:** إذا كنت تستخدم Vercel Postgres، سيتم إضافة المتغيرات تلقائياً!

#### للـ Frontend (Settings → Environment Variables):

| المتغير | القيمة | الوصف |
|---------|--------|-------|
| `VITE_API_BASE_URL` | `https://your-app.vercel.app/api` | رابط الـ API |

**⚠️ مهم:** استبدل `your-app` برابط مشروعك الفعلي على Vercel.

---

### 5️⃣ ربط قاعدة البيانات مع المشروع

إذا كنت تستخدم **Vercel Postgres**:

1. اذهب إلى مشروعك في Vercel
2. اضغط **Storage** → اختر قاعدة البيانات
3. اضغط **Connect to Project**
4. اختر المشروع
5. اضغط **Connect**
6. Redeploy المشروع

إذا كنت تستخدم **Neon** أو **Supabase**:

1. انسخ Connection String
2. اذهب إلى Settings → Environment Variables
3. أضف `POSTGRES_URL` = Connection String الذي نسخته
4. اضغط **Save**
5. Redeploy المشروع

---

### 6️⃣ إعادة رفع (Redeploy)

بعد إضافة متغيرات البيئة:

1. اذهب إلى **Deployments**
2. اضغط على آخر deployment
3. اضغط **⋯** (ثلاث نقاط)
4. اضغط **Redeploy**

---

## 🎉 بعد الرفع:

✅ **Frontend**: `https://your-project.vercel.app`  
✅ **API**: `https://your-project.vercel.app/api`  
✅ **Health Check**: `https://your-project.vercel.app/health`

---

## 🔧 اختبار المشروع محلياً مع PostgreSQL:

### 1. تثبيت التبعيات:
```bash
cd web-backend
npm install
```

### 2. إنشاء ملف `.env`:
```bash
cp .env.example .env
```

### 3. تعديل `.env`:
```env
NODE_ENV=development
PORT=3000
POSTGRES_URL=postgresql://localhost:5432/data_warehouse
```

### 4. تشغيل قاعدة البيانات (إذا كانت محلية):
```bash
# تثبيت PostgreSQL محلياً أو استخدم Docker:
docker run --name postgres-dw -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

### 5. إنشاء الجداول:
```bash
psql postgresql://localhost:5432/postgres -c "CREATE DATABASE data_warehouse;"
psql postgresql://localhost:5432/data_warehouse -f sql/schema.sql
```

### 6. تشغيل السيرفر:
```bash
npm run dev
```

### 7. تشغيل Frontend:
```bash
cd ../web-frontend
npm install
npm run dev
```

---

## 📋 هيكل الملفات الجديدة:

```
DW-Backend-main/
├── vercel.json                    ✅ محدث
├── .vercelignore                  ✅ جديد
├── VERCEL_DEPLOYMENT.md           ✅ محدث
├── web-backend/
│   ├── .env.example               ✅ جديد
│   ├── package.json               ✅ محدث (pg بدلاً من sqlite3)
│   ├── api/
│   │   └── index.ts              ✅ جديد (Vercel Serverless)
│   ├── src/
│   │   ├── server.ts             ✅ محدث
│   │   └── config/
│   │       └── database.ts       ✅ محدث (PostgreSQL)
│   └── sql/
│       ├── schema.sql            ✅ جديد
│       └── *.sql                 ✅ موجود
└── web-frontend/
    └── ...                       ✅ بدون تعديل
```

---

## ❓ حل المشاكل الشائعة:

### مشكلة: "Failed to connect to database"
**الحل:**
- تأكد من صحة `POSTGRES_URL` في Environment Variables
- تأكد من إضافة `?sslmode=require` في نهاية الرابط للاتصال الآمن
- مثال: `postgresql://user:pass@host/db?sslmode=require`

### مشكلة: "Table does not exist"
**الحل:**
- تأكد من تنفيذ `schema.sql` على قاعدة البيانات
- افتح SQL Editor ونفذ السكربت يدوياً

### مشكلة: Build failed
**الحل:**
- تحقق من Build Logs في Vercel
- تأكد من أن `package.json` محدث
- تأكد من تثبيت `pg` و `@types/pg`

### مشكلة: API يعطي 500 Error
**الحل:**
- افتح Vercel Logs (Runtime Logs)
- تحقق من اتصال قاعدة البيانات
- تأكد من وجود البيانات في الجداول

---

## 🚀 نصائح للأداء:

1. ✅ استخدم Connection Pool (موجود بالفعل في الكود)
2. ✅ أضف Indexes على الأعمدة المستخدمة في WHERE/JOIN
3. ✅ استخدم Caching للبيانات الثابتة
4. ✅ راقب استهلاك Database Connections

---

## 📚 موارد مفيدة:

- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Neon Docs](https://neon.tech/docs)
- [Supabase Docs](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 🎯 الخطوة القادمة:

1. ✅ رفع الكود على GitHub
2. ✅ ربط GitHub مع Vercel
3. ✅ إنشاء قاعدة بيانات PostgreSQL
4. ✅ تنفيذ schema.sql
5. ✅ إضافة Environment Variables
6. ✅ Deploy المشروع
7. ✅ اختبار الموقع

**بالتوفيق! 🎉**
