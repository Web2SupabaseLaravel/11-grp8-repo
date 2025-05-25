<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>قائمة المستخدمين</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            padding: 30px;
        }

        h1 {
            font-size: 24px;
        }

        table {
            border-collapse: collapse;
            width: 800px;
            text-align: center;
        }

        th, td {
            border: 1px solid #000;
            padding: 8px 12px;
        }

        th {
            background-color: #f0f0f0;
        }

        .actions form {
            display: inline;
        }

        .btn {
            padding: 4px 8px;
            border: none;
            border-radius: 4px;
            margin: 0 2px;
            cursor: pointer;
        }

        .btn-show {
            background-color: #3490dc;
            color: white;
        }

        .btn-edit {
            background-color: #f6993f;
            color: white;
        }

        .btn-delete {
            background-color: #e3342f;
            color: white;
        }
    </style>
</head>
<body>

    <h1>قائمة المستخدمين</h1>

    @if(session('success'))
        <p style="color: green;">{{ session('success') }}</p>
    @endif

    <table>
        <tr>
            <th>الرقم</th>
            <th>الاسم</th>
            <th>البريد</th>
            <th>الإجراءات</th>
        </tr>
        @forelse ($users as $user)
            <tr>
                <td>{{ $user->id }}</td>
                <td>{{ $user->name ?? '—' }}</td>
                <td>{{ $user->email ?? '—' }}</td>
                <td class="actions">
                    <a href="{{ route('users.show', $user->id) }}" class="btn btn-show">عرض</a>
                    <a href="{{ route('users.edit', $user->id) }}" class="btn btn-edit">تعديل</a>
                    <form action="{{ route('users.destroy', $user->id) }}" method="POST" onsubmit="return confirm('هل أنت متأكد أنك تريد حذف هذا المستخدم؟');">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-delete">حذف</button>
                    </form>
                </td>
            </tr>
        @empty
            <tr>
                <td colspan="4">لا يوجد مستخدمين</td>
            </tr>
        @endforelse
    </table>

</body>
</html>
