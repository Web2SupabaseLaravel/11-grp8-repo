<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserApiController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json(['users' => $users], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'phone'    => 'nullable|numeric',
            'type'     => 'nullable|string|max:255',
        ]);

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => bcrypt($validated['password']),
            'phone'    => $validated['phone'] ?? null,
            'type'     => $validated['type'] ?? null,
        ]);

        return response()->json(['message' => 'تم إنشاء المستخدم بنجاح', 'user' => $user], 201);
    }

    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'المستخدم غير موجود'], 404);
        }

        return response()->json(['user' => $user], 200);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'المستخدم غير موجود'], 404);
        }

        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
            'phone'    => 'nullable|numeric',
            'type'     => 'nullable|string|max:255',
        ]);

        $user->update([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => $request->filled('password') ? bcrypt($validated['password']) : $user->password,
            'phone'    => $validated['phone'] ?? null,
            'type'     => $validated['type'] ?? null,
        ]);

        return response()->json(['message' => 'تم تحديث بيانات المستخدم', 'user' => $user], 200);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'المستخدم غير موجود'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'تم حذف المستخدم'], 200);
    }
}
