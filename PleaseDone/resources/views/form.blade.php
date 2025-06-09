@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-start">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                {{ $titleForm }}
                </div> 
                <div class="card-body">

                    {!! Form::model($event, ['route' => $route, 'method' => $method]) !!}
                    @csrf

                    <div class="form-group">
                        <label for="my-input">Name</label>
                        {!! Form::text('name', null, ['class'=>'form-control']) !!}
                        <span class="text-helper">{{ $errors->first('name') }}</span>
                    </div>

                    <div class="form-group">
                        <label for="my-input">Event Date</label> 
                        {!! Form::date('event_date', null, ['class'=>'form-control']) !!} 
                        <span class="text-helper">{{ $errors->first('event_date') }}</span>
                    </div>

                    <div class="form-group">
                        <label for="my-input">Event Topic</label>
                        {!! Form::text('event_topic', null, ['class'=>'form-control']) !!}
                        <span class="text-helper">{{ $errors->first('event_topic') }}</span>
                    </div>


                    <div class="form-group">
                        {!! Form::submit($submitButton, ['class'=>'btn btn-primary']) !!}
                        {!! Form::close() !!}
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection