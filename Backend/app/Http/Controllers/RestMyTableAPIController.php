<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller; // Import the base Controller class
use App\Models\RestMyTable; // Ensure this model exists
                                               

class RestMyTableAPIController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return RestMyTable::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validatedData = $request->validate([
        'Table_ID' => 'nullable|integer', // Assuming Table_ID is an integer
        'Status' => 'required|string',
        'Restau_ID' => 'nullable|unique:RestMyTable,Restau_ID',
        'Created_At' => 'nullable|date',
        'Updated_At' => 'nullable|date',
       
    ]);
    $table = RestMyTable::create($validatedData);
    return response()->json($table, 201);
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return RestMyTable::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, string $id)
{
    $table = RestMyTable::findOrFail($id);

    $validatedData = $request->validate([
        'Table_ID' => 'nullable|integer',
        'Status' => 'required|string',
        'Restau_ID' => 'nullable|unique:RestMyTable,Restau_ID,' . $id . ',Table_ID',
        'Created_At' => 'nullable|date',
        'Updated_At' => 'nullable|date',
    ]);

    $table->update($validatedData);

    return response()->json($table, 200);
}
    /*
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $table = RestMyTable::findOrFail($id);
        $table->delete();
        return response()->json(['message' => 'Table deleted successfully']);
    }
}
