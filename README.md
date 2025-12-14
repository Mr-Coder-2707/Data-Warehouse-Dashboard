# 📊 Data Warehouse Dashboard - PostgreSQL Version

## 🎯 Overview
Dashboard تحليلي متقدم لعرض بيانات Data Warehouse مع دعم PostgreSQL وجاهز للرفع على Vercel.

## ✅ التحديثات الأخيرة
- ✅ **تحويل من SQLite إلى PostgreSQL**
- ✅ دعم كامل لـ **Vercel Serverless**
- ✅ استخدام **Connection Pool** للأداء العالي
- ✅ إضافة ملف **schema.sql** لإنشاء الجداول
- ✅ دعم **Environment Variables**

## 🚀 المميزات
- 📊 Dashboard تفاعلي مع مؤشرات الأداء الرئيسية (KPIs)
- 📈 رسوم بيانية للمبيعات اليومية والشهرية
- 🔝 عرض أفضل وأسوأ المنتجات مبيعاً
- 🎯 تصفية حسب الفئات
- 📉 توقعات المبيعات باستخدام Linear Regression
- 🎨 تصميم حديث وسريع الاستجابة

## 🏗️ البنية التقنية

### Backend
- **Framework:** Express.js + TypeScript
- **Database:** PostgreSQL (بدلاً من SQLite)
- **Client:** pg (node-postgres)
- **API:** RESTful API
- **Deployment:** Vercel Serverless Functions

### Frontend
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Charts:** Recharts
- **Styling:** CSS Modules
- **HTTP Client:** Axios
- **Deployment:** Vercel

## 📁 هيكل المشروع

```
.
├── web-backend/              # Backend API
│   ├── api/                 # Vercel Serverless entry point
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts  # PostgreSQL connection
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── server.ts
│   ├── sql/
│   │   ├── schema.sql       # Database schema
│   │   └── *.sql           # Query files
│   ├── .env.example
│   └── package.json
│
├── web-frontend/            # Frontend Dashboard
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── types/
│   └── package.json
│
├── vercel.json              # Vercel configuration
├── .vercelignore
├── VERCEL_DEPLOYMENT.md     # دليل الرفع الكامل
└── README.md
```

## 🛠️ التثبيت والتشغيل المحلي

### المتطلبات
- Node.js 18 أو أحدث
- PostgreSQL 14 أو أحدث
- npm أو yarn

### 1. استنساخ المشروع
```bash
git clone https://github.com/Mr-Coder-2707/Data-Warehouse-Dashboard.git
cd Data-Warehouse-Dashboard
```

### 2. إعداد Backend

```bash
cd web-backend
npm install
```

أنشئ ملف `.env`:
```env
NODE_ENV=development
PORT=3000
POSTGRES_URL=postgresql://localhost:5432/data_warehouse
```

إنشاء قاعدة البيانات:
```bash
createdb data_warehouse
psql data_warehouse -f sql/schema.sql
```

تشغيل Backend:
```bash
npm run dev
```
السيرفر سيعمل على: `http://localhost:3000`

### 3. إعداد Frontend

افتح terminal جديد:
```bash
cd web-frontend
npm install
npm run dev
```
الموقع سيعمل على: `http://localhost:5173`

## 🌐 الرفع على Vercel

📖 **اتبع التعليمات التفصيلية الكاملة في:** **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)**

### خطوات سريعة:

1. **إنشاء قاعدة بيانات PostgreSQL**
   - Vercel Postgres (موصى به)
   - أو Neon.tech
   - أو Supabase

2. **تنفيذ schema.sql** على قاعدة البيانات

3. **رفع على GitHub**:
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

4. **ربط مع Vercel**:
   - اذهب إلى [vercel.com](https://vercel.com)
   - اختر repository
   - أضف Environment Variables
   - Deploy!

## 🔗 API Endpoints

| Endpoint | Method | الوصف |
|----------|--------|-------|
| `/api/kpis` | GET | إجمالي المبيعات والكميات والطلبات |
| `/api/sales/daily` | GET | المبيعات اليومية |
| `/api/sales/monthly` | GET | المبيعات الشهرية |
| `/api/products/top` | GET | أفضل 10 منتجات |
| `/api/products/bottom` | GET | أسوأ 10 منتجات |
| `/api/categories` | GET | قائمة الفئات |
| `/api/products/:name/sales` | GET | تاريخ مبيعات منتج |
| `/api/sales/forecast` | GET | توقعات المبيعات |

## 🗄️ قاعدة البيانات

### الجداول الرئيسية:

- **`gold_dim_products`** - بيانات المنتجات
- **`gold_dim_customers`** - بيانات العملاء
- **`gold_dim_dates`** - جدول التواريخ
- **`gold_fact_sales`** - جدول المبيعات الرئيسي

### البيانات التجريبية:

ملف `schema.sql` يحتوي على بيانات نموذجية للتجربة:
- 5 منتجات
- 3 عملاء
- 30 يوم من البيانات
- 100 عملية بيع

**يمكنك استبدالها ببياناتك الحقيقية!**

## ⚠️ ملاحظات مهمة

### تم إزالة SQLite
- المشروع الآن يستخدم PostgreSQL فقط
- يمكن حذف مجلد `backend/` القديم
- ملف `gold.db` لم يعد مطلوباً

### للرفع على Production
- استخدم قاعدة بيانات PostgreSQL خارجية
- لا تستخدم SQLite في Production على Vercel
- أضف Environment Variables بشكل صحيح

## 🤝 المساهمة

نرحب بالمساهمات! يرجى:

1. Fork المشروع
2. إنشاء branch جديد
3. Commit التغييرات
4. Push وفتح Pull Request

## 📝 الترخيص

هذا المشروع مفتوح المصدر ومتاح تحت رخصة MIT.

## 👨‍💻 المطور

**Mr-Coder-2707**
- GitHub: [@Mr-Coder-2707](https://github.com/Mr-Coder-2707)

## 📞 الدعم

- فتح Issue على GitHub
- مراجعة [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

---

## ⭐ إذا أعجبك المشروع

لا تنسى إعطاء المشروع ⭐ على GitHub!

---

**Built with ❤️ using React, TypeScript, Express, and PostgreSQL**

