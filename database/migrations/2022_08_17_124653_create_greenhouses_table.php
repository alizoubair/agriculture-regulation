<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGreenhousesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('greenhouses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('farm_id');
            $table->foreign('farm_id')->references('id')->on('farms');
            $table->string('area');
            $table->string('perimeter');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('greenhouses');
    }
}
