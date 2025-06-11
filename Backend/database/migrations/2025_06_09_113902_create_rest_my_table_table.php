<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
     /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('RestMyTable', function (Blueprint $table) {
            $table->bigIncrements('Table_ID');
            $table->text('Status');
            $table->bigInteger('Restau_ID')->unique()->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('RestMyTable');
    }
};
