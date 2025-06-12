<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>تعديل المستخدم</title>
</head>
<body>
    <h1>تعديل المستخدم</h1>

    <form action="{{ route('users.update', $user->id) }}" method="POST">
        @csrf
        @method('PUT')

        <label>الاسم:</label><br>
        <input type="text" name="name" value="{{ old('name', $user->name) }}" required><br><br>

        <label>البريد الإلكتروني:</label><br>
        <input type="email" name="email" value="{{ old('email', $user->email) }}" required><br><br>

        <label>رقم الهاتف:</label><br>
        <input type="text" name="phone" value="{{ old('phone', $user->phone) }}"><br><br>

        <label>النوع:</label><br>
        <input type="text" name="type" value="{{ old('type', $user->type) }}"><br><br>

        <label>كلمة المرور (اختياري):</label><br>
        <input type="password" name="password"><br><br>

        <button type="submit">تحديث</button>
    </form>

    <br>
    <a href="{{ route('users.index') }}">⬅ رجوع إلى القائمة</a>
</body>
</html>
