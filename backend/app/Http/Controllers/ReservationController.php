<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use Illuminate\Routing\Controller;

class ReservationController extends Controller
{
  public function index(){
      return Reservation::all();}

  public function store(Request $request)
{
    $validatedData = $request->validate([
        'ID' => 'required',
       'Customer_Name' => 'required',
         'Action' => 'required',
        'Date' => 'required',
        'TID' => 'required',
        'UID' => 'required',
        'RID' => 'required',
    ]);
    $table = Reservation::create($validatedData);
    return response()->json($table, 201);
}

  public function show(string $id){
      return Reservation::findOrFail($id);}

 public function update(Request $request, string $id)
{
    $table = Reservation::findOrFail($id);

    $validatedData = $request->validate([
        'ID' => 'required',
        'Customer_Name' => 'required',
        'Action' => 'required',
        'Date' => 'required',
        'TID' => 'required',
        'UID' => 'required',
        'RID' => 'required',
    ]);

    $table->update($validatedData);

    return response()->json($table, 200);
}

  public function destroy(string $id){
    $table = Reservation::findOrFail($id);
    $table->delete();
      return response()->json(['message' => 'Table deleted successfully']);}
}
