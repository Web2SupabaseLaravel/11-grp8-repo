<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['Reservation'] = new \App\Models\Reservation();
        return $data;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $data['Reservation'] = new \App\Models\Reservation();
    $data['route'] = 'dataevent.store';
    $data['method'] = 'post';
   /* $data['titleForm'] = 'Form Input Event';
    $data['submitButton'] = 'Submit';
    return view('event/form_event', $data);*/


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
        'name' => 'required',
        'Reservation_date' => 'required',
        'Reservation_time' => 'required',
        'Reservation_reservation_id' => 'required',
        'Reservation_Status' => 'required',
        'Reservation_IDTABLE' => 'required',
        'Reservation_IDRest' => 'required',
        'Reservation_IDUser' => 'required',
    ]);

    $inputReservation = new \App\Models\Reservationt();
    $inputReservation->name = $request->name;
    $inputReservation->Reservation_date = $request->Reservation_date;
    $inputReservation->Reservation_time = $request->Reservation_time;
    $inputReservation->Reservation_reservation_id= $request->Reservation_reservation_id;
    $inputReservation->Reservation_Status = $request->Reservation_Status;
    $inputReservation->Reservation_IDTABLE = $request->Reservation_IDTABLE;
    $inputReservation->Reservation_IDRest = $request->Reservation_IDRest;
    $inputReservation->Reservation_IDUser = $request->Reservation_IDUser;
    $inputReservation->save();
    return redirect('dataReservation');

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
