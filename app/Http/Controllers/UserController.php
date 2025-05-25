<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return view('users.index', compact('users'));
    }

    public function create()
    {
        return view('users.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'phone'    => 'nullable|numeric',
            'type'     => 'nullable|string|max:255',
        ]);

        User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => bcrypt($request->password),
            'phone'    => $request->phone,
            'type'     => $request->type,
        ]);

        return redirect()->route('users.index')->with('success', 'تم إضافة المستخدم بنجاح');
    }

    public function show(string $id)
    {
        $user = User::findOrFail($id);
        return view('users.show', compact('user'));
    }

    public function edit(string $id)
    {
        $user = User::findOrFail($id);
        return view('users.edit', compact('user'));
    }

    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
            'phone'    => 'nullable|numeric',
            'type'     => 'nullable|string|max:255',
        ]);

        $user->update([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => $request->filled('password') ? bcrypt($request->password) : $user->password,
            'phone'    => $request->phone,
            'type'     => $request->type,
        ]);

        return redirect()->route('users.index')->with('success', 'تم تحديث بيانات المستخدم');
    }

    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('users.index')->with('success', 'تم حذف المستخدم');
    }
}
