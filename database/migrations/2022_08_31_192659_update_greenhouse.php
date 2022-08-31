<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateGreenhouse extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('greenhouses', function(Blueprint $table) {
            $table->string('zoom');
            $table->string('center');
            $table->string('coordinates');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('greenhouses', function(Blueprint $table) {
            $table->string('zoom');
            $table->string('center');
            $table->string('coordinates');
        });
    }
}
