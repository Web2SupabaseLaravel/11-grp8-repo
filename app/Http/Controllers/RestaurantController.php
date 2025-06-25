<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use Illuminate\Support\Facades\Log;


class RestaurantController extends Controller
{
  public function index() 
  {
    $resp = Restaurant::all();
    return view('restaurant.index', compact('restaurants'));
  }

}
