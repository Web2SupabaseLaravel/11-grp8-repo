<!DOCTYPE html>
<html>
<head>
    <title>Create Restaurant</title>
</head>
<body>
    <h1>Create Restaurant Form</h1>
    <form action="{{ route('restaurant.store') }}" method="POST">
        @csrf
        <label>Name:</label>
        <input type="text" name="name"><br>

        <label>Address:</label>
        <input type="text" name="address"><br>

        <label>Phone:</label>
        <input type="text" name="phone"><br>

        <label>Open Time:</label>
        <input type="time" name="open_time"><br>

        <label>Close Time:</label>
        <input type="time" name="close_time"><br>

        <button type="submit">Create</button>
    </form>
</body>
</html>
