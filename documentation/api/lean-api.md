A step-by-step guide on how to set up point3orless.com Lumen API for handling business data, including creating, retrieving, updating, and deleting business records without validation.

### Setting Up Lumen API for Business Management

#### 1. Install Lumen

First, make sure you have Lumen installed. If you haven’t already set up a new Lumen project, run:

```bash
composer create-project --prefer-dist laravel/lumen point3-or-less-api
```

#### 2. Set Up Environment

Navigate to your project directory:

```bash
cd point3-or-less-api
```

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Edit the `.env` file to configure your database connection:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

#### 3. Create the Business Model

Create the Business model using the following command:

```bash
php artisan make:model Business
```

#### 4. Define the Business Model

Open `app/Models/Business.php` and define your model as follows:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    protected $fillable = [
        'business_name',
        'business_type',
        'address',
        'phone_number',
        'email',
        'website_url',
        'owner_name',
        'established_date',
        'ein_or_tax_id',
        'resellers_certificate',
        'number_of_employees',
        'annual_revenue',
    ];
}
```

#### 5. Create Migration for the Business Table

Generate a migration file for the Business model:

```bash
php artisan make:migration create_businesses_table
```

Edit the migration file in `database/migrations` to define the table structure:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBusinessesTable extends Migration
{
    public function up()
    {
        Schema::create('businesses', function (Blueprint $table) {
            $table->id();
            $table->string('business_name');
            $table->string('business_type');
            $table->string('address');
            $table->string('phone_number');
            $table->string('email');
            $table->string('website_url')->nullable();
            $table->string('owner_name');
            $table->date('established_date');
            $table->string('ein_or_tax_id');
            $table->string('resellers_certificate')->nullable();
            $table->integer('number_of_employees')->nullable();
            $table->decimal('annual_revenue', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('businesses');
    }
}
```

Run the migration to create the table:

```bash
php artisan migrate
```

#### 6. Set Up the Controller

Create a controller for managing business operations:

```bash
php artisan make:controller BusinessController
```

Open `app/Http/Controllers/BusinessController.php` and define the following methods:

```php
<?php

namespace App\Http\Controllers;

use App\Models\Business;
use Illuminate\Http\Request;

class BusinessController extends Controller
{
    // Create a new business
    public function store(Request $request)
    {
        $business = Business::create($request->all());
        return response()->json($business, 201);
    }

    // Get all businesses
    public function index()
    {
        $businesses = Business::all();
        return response()->json($businesses);
    }

    // Get a single business
    public function show($id)
    {
        $business = Business::find($id);
        if (!$business) {
            return response()->json(['error' => 'Business not found'], 404);
        }
        return response()->json($business);
    }

    // Update a business
    public function update(Request $request, $id)
    {
        $business = Business::find($id);
        if (!$business) {
            return response()->json(['error' => 'Business not found'], 404);
        }

        $business->update($request->all());
        return response()->json($business);
    }

    // Delete a business
    public function destroy($id)
    {
        $business = Business::find($id);
        if (!$business) {
            return response()->json(['error' => 'Business not found'], 404);
        }
        Business::destroy($id);
        return response()->json(null, 204);
    }
}
```

#### 7. Define Routes

Open `routes/web.php` and set up routes for your API:

```php
$router->group(['prefix' => 'api/businesses'], function () use ($router) {
    $router->post('/', 'BusinessController@store');
    $router->get('/', 'BusinessController@index');
    $router->get('{id}', 'BusinessController@show');
    $router->put('{id}', 'BusinessController@update');
    $router->delete('{id}', 'BusinessController@destroy');
});
```

#### 8. Run the Application

Start the Lumen development server:

```bash
php -S localhost:8000 -t public
```

#### 9. Testing the API with Postman or CURL

**To Create a Business (POST)**:

- **Endpoint**: `POST http://localhost:8000/api/businesses`
- **Body** (JSON):

```json
{
  "business_name": "Sample Business",
  "business_type": "Retail",
  "address": "123 Main St",
  "phone_number": "555-1234",
  "email": "contact@samplebusiness.com",
  "website_url": "http://samplebusiness.com",
  "owner_name": "John Doe",
  "established_date": "2020-01-01",
  "ein_or_tax_id": "12-3456789",
  "resellers_certificate": "123456789",
  "number_of_employees": 10,
  "annual_revenue": 500000
}
```

**To Get All Businesses (GET)**:

- **Endpoint**: `GET http://localhost:8000/api/businesses`

**To Get a Single Business (GET)**:

- **Endpoint**: `GET http://localhost:8000/api/businesses/{id}`

**To Update a Business (PUT)**:

- **Endpoint**: `PUT http://localhost:8000/api/businesses/{id}`
- **Body** (JSON):

```json
{
  "business_name": "Updated Business Name"
}
```

**To Delete a Business (DELETE)**:

- **Endpoint**: `DELETE http://localhost:8000/api/businesses/{id}`

### Conclusion

This setup should allow you to create, read, update, and delete business records without any validation. You can refine the validation later on as needed. If you have any further questions or need help with anything else, feel free to ask!
