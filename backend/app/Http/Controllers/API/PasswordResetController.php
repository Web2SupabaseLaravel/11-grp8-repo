<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;
use App\Models\User;

class PasswordResetController extends Controller
{
    // إرسال رابط إعادة تعيين كلمة المرور
    public function sendResetLink(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.'])
            : response()->json(['message' => 'فشل في إرسال الرابط. حاول مرة أخرى.'], 500);
    }

    // تعيين كلمة مرور جديدة
    public function reset(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'token' => 'required',
            'password' => 'required|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, $password) {
                $user->forceFill([
                    'password' => bcrypt($password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'تم تعيين كلمة المرور بنجاح.'])
            : response()->json(['message' => 'فشل في تعيين كلمة المرور. الرابط غير صالح أو منتهي.'], 400);
    }
}
