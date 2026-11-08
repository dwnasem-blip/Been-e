# 🔐 Supabase Setup Guide for WAIN App

## 📋 الخطوات التالية

### المرحلة 1: ✅ إعداد البيانات الأساسية

تم إنشاء الملفات التالية:
- `src/services/supabase.ts` - عميل Supabase الرئيسي
- `src/services/auth.ts` - خدمة المصادقة الكاملة
- `src/store/auth.ts` - Zustand store للمصادقة
- `src/hooks/useAuth.ts` - Custom hooks للمصادقة
- `src/services/connectionTest.ts` - اختبار الاتصال
- `.env.example` - ملف متغيرات البيئة
- `SQL_SCHEMA.sql` - قاعدة البيانات الكاملة

---

## 🚀 الخطوات المطلوبة منك

### 1️⃣ إضافة المتغيرات إلى `.env.local`

أنشئ ملف `.env.local` في جذر المشروع:

```bash
cd /home/user/Been-e
touch .env.local
```

أضف القيم الخاصة بك (ستحصل عليها من Supabase):

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key_here
```

**ملاحظات الأمان:**
- ✅ هذا الملف موجود في `.gitignore` لن يُرفع إلى GitHub
- ✅ لا تضع Service Role Key أو Secret Key هنا
- ✅ استخدم Publishable Key فقط (يبدأ بـ `sb_publishable_`)

---

### 2️⃣ إعداد Supabase Dashboard

#### أ) تشغيل SQL Schema

1. اذهب إلى [Supabase Dashboard](https://supabase.com/dashboard)
2. اختر مشروع WAIN
3. اذهب إلى **SQL Editor**
4. اضغط **New Query**
5. انسخ محتوى الملف `SQL_SCHEMA.sql` بالكامل
6. الصقه في الـ Editor
7. اضغط **Run** (يجب أن ترى ✓ في النهاية)

**يجب أن تُنشأ الجداول التالية:**
```
✓ profiles
✓ items
✓ documents
✓ warranties
✓ subscriptions
✓ loans
✓ reminders
✓ notifications
✓ ai_usage
```

#### ب) تفعيل المصادقة

1. اذهب إلى **Authentication** في الشريط الجانبي
2. تحقق من **Email/Password** أنها مفعلة (افتراضياً مفعلة)
3. لا تغير أي شيء الآن - الإعدادات الافتراضية كافية

#### ج) إعداد Storage (الصور والمستندات)

1. اذهب إلى **Storage** في الشريط الجانبي
2. اضغط **Create New Bucket**
3. أنشئ bucket باسم: `items-images`
   - اجعل "File Size Limit" = 5 MB
   - افعل "Public bucket" إذا أردت أو اتركه Private
4. اضغط **Create Bucket**
5. كرر العملية لـ bucket باسم: `documents`

#### د) التحقق من RLS

1. اذهب إلى **Database** → **Tables**
2. اختر أي table (مثلاً `profiles`)
3. انقر على **RLS** tab
4. يجب أن تجد سياسات (policies) معرفة
5. تحقق من أن جميع الجداول مفعل عليها RLS

---

### 3️⃣ الحصول على المفاتيح

1. اذهب إلى **Settings** → **API** في Supabase
2. ستجد:
   - **Project URL** - انسخها
   - **Publishable Key** (يبدأ بـ `sb_publishable_`) - انسخها
   - **Service Role Secret** - لا تستخدمها في التطبيق! (فقط للـ Backend)

3. الصق القيم في `.env.local`:
```env
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxx
```

---

### 4️⃣ اختبار الاتصال

بعد إضافة المفاتيح، شغل التطبيق:

```bash
npm run start
```

**سيحدث التالي:**
1. سيظهر splash screen (شاشة البداية)
2. سيتحقق من المصادقة
3. إذا لم تكن مسجل دخول، سينقلك لـ login screen
4. جرب تسجيل حساب جديد أو دخول

**في حالة المشاكل:**
- تحقق من المفاتيح في `.env.local`
- تأكد من أن SQL Schema تم تشغيله
- تحقق من كونسول الخطأ في المتصفح/الهاتف

---

## 🔌 اختبار الاتصال البرمجي

يمكنك اختبار الاتصال مباشرة من التطبيق:

```typescript
import { logConnectionTest } from '@/services/connectionTest';

// في أي مكان في التطبيق
await logConnectionTest('Supabase Connection Test');
```

ستظهر نتائج مفصلة في الـ console:
```
============================================================
🧪 Supabase Connection Test
============================================================
⏰ Timestamp: 2026-11-08T16:45:30.123Z
📋 Configured: ✅ Yes
🔌 Connected: ✅ Yes
============================================================
```

---

## 🔐 إضافة المفاتيح إلى Cloud Environment (الإنتاج)

### الطريقة الآمنة:

في Claude Code Cloud (عندما تكون جاهزاً للإنتاج):

1. اذهب إلى **Settings** → **Environment** في Claude
2. اضغط على environment الحالي أو أنشئ واحد جديد
3. أضف متغيرات البيئة:
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxx
   ```
4. **لا تضف:**
   - Service Role Key
   - Database Password
   - أي Secret Keys
   - API Keys الخاصة

---

## ✅ قائمة التحقق

- [ ] أنشأت حساب Supabase
- [ ] أنشأت مشروع WAIN
- [ ] شغلت SQL Schema
- [ ] الجداول موجودة (9 جداول)
- [ ] RLS مفعل على جميع الجداول
- [ ] أنشأت buckets (items-images, documents)
- [ ] نسخت Project URL و Publishable Key
- [ ] أضفت القيم إلى `.env.local`
- [ ] شغلت التطبيق `npm start`
- [ ] اختبرت التسجيل/الدخول
- [ ] الاتصال نجح ✅

---

## 🚨 استكشاف الأخطاء

### ❌ خطأ: "Missing Supabase configuration"
**الحل:**
- تحقق من `.env.local` موجود في جذر المشروع
- تأكد من أن القيم صحيحة (لا توجد مسافات زائدة)
- إعادة تشغيل الخادم: `npm run start`

### ❌ خطأ: "Failed to connect to Supabase Auth"
**الحل:**
- تحقق من أن الـ URL صحيح (يبدأ بـ https)
- تأكد من أن Publishable Key صحيح
- حاول تسجيل الدخول مرة أخرى

### ❌ خطأ: "User already exists"
**الحل:**
- البريد الإلكتروني مسجل بالفعل
- استخدم بريد إلكتروني مختلف

### ❌ خطأ: "Invalid credentials"
**الحل:**
- تأكد من البريد الإلكتروني وكلمة المرور
- تحقق من أنك استخدمت نفس البريد الذي أنشأت به الحساب

### ❌ خطأ: "profiles table not found"
**الحل:**
- تأكد من تشغيل SQL Schema بالكامل
- اذهب إلى Supabase Dashboard
- تحقق من وجود جدول `profiles` في **Database** → **Tables**

---

## 📚 ملفات المصادقة

### الملفات المُنشأة:

```
src/
├── services/
│   ├── supabase.ts           # عميل Supabase
│   ├── auth.ts               # خدمة المصادقة
│   └── connectionTest.ts      # اختبار الاتصال
├── store/
│   └── auth.ts               # Zustand store
├── hooks/
│   └── useAuth.ts            # Custom hooks
└── types/
    └── index.ts              # التعريفات (محدثة)

app/
├── auth/
│   ├── login.tsx             # ✅ محدثة لاستخدام المصادقة
│   ├── register.tsx          # قادمة قريباً
│   └── forgot-password.tsx   # قادمة قريباً
└── _layout.tsx              # ✅ محدثة للتحقق من المصادقة
```

---

## 🎯 الخطوات التالية

بعد إعداد Supabase بنجاح:

1. ✅ تنفيذ شاشة التسجيل (Register)
2. ✅ تنفيذ استعادة كلمة المرور (Forgot Password)
3. ✅ ربط الشاشات الأخرى بالمصادقة
4. ✅ حفظ الجلسة بشكل آمن
5. ✅ اختبار شامل للمصادقة

---

## 📞 الدعم

**المشكلة:** التطبيق لا يتصل بـ Supabase

**الخطوات:**
1. تحقق من المفاتيح في `.env.local`
2. اختبر الاتصال: `await logConnectionTest()`
3. تحقق من console logs للأخطاء
4. تأكد من أن الجداول موجودة في Supabase

---

**الحالة:** 🟡 جاهز للخطوة التالية  
**آخر تحديث:** November 8, 2026  
**الإصدار:** Phase 2 - Authentication Setup
