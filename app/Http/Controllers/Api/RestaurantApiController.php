<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Restaurant;
use Illuminate\Support\Facades\Log;


class RestaurantApiController extends Controller
{
  public function index() 
  {
    $resp = Restaurant::all();
    return response()->json($resp,200);
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
        'name' => 'required|string|max:40',
        'address' => 'required|string',
        'phone' => 'required|string',
        'open_time' => 'required|date_format:H:i',
        'close_time' => 'required|date_format:H:i',
    ]);

    // Create restaurant
    $restaurant = Restaurant::create($validated);

    // Return response
    return response()->json([
        'success' => true,
        'message' => 'Restaurant created successfully.',
        'data' => $restaurant,
    ]);
  }

    public function update(Request $request, $restid) 
    {
      $rest = Restaurant::findorFail($restid);
      $validated = $request->validate([
        'name' => 'sometimes|string|max:40',
        'address' => 'sometimes|string',
        'phone' => 'sometimes|string',
        'open_time' => 'sometimes|date_format:H:i',
        'close_time' => 'sometimes|date_format:H:i',
    ]);
      $rest->update($validated);
      return response()->json($rest,200);
  }

  public function show($id)
  {
    $rest = Restaurant::findorFail($id);
    return response()->json($rest, 200);
  }

  public function destroy($id)
  {
    $rest = Restaurant::findorFail($id);
    $rest->delete();
    return response()->json(null, 204);
  }
}
