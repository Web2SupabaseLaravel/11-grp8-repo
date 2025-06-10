<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    /**
     * Display a listing of the user's notifications.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        // Get user ID from authenticated user
        $user = auth()->guard('api')->user();
        $userId = $user->id;
        
        $notifications = Notification::where('UID', $userId)
            ->orderBy('CreatedTime', 'desc')
            ->paginate(10);
        
        return response()->json($notifications);
    }

    /**
     * Display the specified notification.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id)
    {
        $notification = Notification::findOrFail($id);
        $user = auth()->guard('api')->user();
        
        if ($notification->UID != $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        
        return response()->json($notification);
    }

    /**
     * Remove the specified notification.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id)
    {
        $notification = Notification::findOrFail($id);
        $user = auth()->guard('api')->user();
        
        if ($notification->UID != $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        
        $notification->delete();
        
        return response()->json(['message' => 'Notification deleted successfully']);
    }

    /**
     * Send a test notification to a user.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendTest(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'message' => 'required|string',
        ]);
        
        $notification = Notification::create([
            'Title' => $validated['title'],
            'Massage' => $validated['message'],
            'UID' => $validated['user_id']
        ]);
        
        return response()->json([
            'message' => 'Test notification sent successfully',
            'notification' => $notification
        ]);
    }
} 
