<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>تفاصيل المستخدم</title>
</head>
<body>

    <h1>معلومات المستخدم</h1>

    <p><strong>الاسم:</strong> {{ $user->name }}</p>
    <p><strong>البريد الإلكتروني:</strong> {{ $user->email }}</p>
    <p><strong>الهاتف:</strong> {{ $user->phone }}</p>
    <p><strong>النوع:</strong> {{ $user->type }}</p>

    <a href="{{ route('users.index') }}">🔙 رجوع</a>

</body>
</html>
