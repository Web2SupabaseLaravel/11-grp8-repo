<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>إضافة مستخدم جديد</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            padding: 30px;
        }

        h1 {
            font-size: 24px;
        }

        label {
            display: block;
            margin-top: 10px;
        }

        input {
            width: 300px;
            padding: 8px;
            margin-top: 5px;
        }

        button {
            margin-top: 15px;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
        }

        a {
            display: inline-block;
            margin-top: 15px;
        }
    </style>
</head>
<body>

    <h1>إضافة مستخدم جديد</h1>

    <form action="{{ route('users.store') }}" method="POST">
        @csrf

        <label for="name">الاسم:</label>
        <input type="text" name="name" id="name" required>

        <label for="email">البريد الإلكتروني:</label>
        <input type="email" name="email" id="email" required>

        <label for="password">كلمة المرور:</label>
        <input type="password" name="password" id="password" required>

        <button type="submit">حفظ</button>
    </form>

    <a href="{{ route('users.index') }}">↩ الرجوع إلى القائمة</a>

</body>
</html>
