<?php 
namespace App\Http\Controllers;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;

class VideoController extends Controller
{
    /**
  * @return Response
    */


public function index()
{
  $videos = \App\Models\Video::get();
  return response()->json([
  	       "msg" => "Success",
  	      "videos" => $videos->toArray()

  	], 200
 
  	);


}
/**
*
* @return Response
*/

public function store(Request $request)
{
	$video = new \App\Models\Video();
	$video->name = $request->name;
	$video->cur_location = $request->cur_location;
	$video->summary = $request->summary;
	$video->save();

	return response()->json([
  	       "msg" => "Success",
  	      "id" => $video->id

  	], 200

  	);
}
/**
*Display the specified resource.
*
*@param int $id
*@return Response
*/

public function show($id)
{
 $video = \App\Models\Video::find($id);
  return response()->json([
           "msg" => "Success",
          "video" => $video

    ], 200
 
    );
}

public function update(Request $request, $id)  
{ 
  $video = \App\Models\Video::find($id);
  $video->name = $request->name;
  $video->cur_location = $request->cur_location;
  $video->summary = $request->summary;
  $video->save();

  return response()->json([
           "msg" => "Success",

    ], 200

    );
}

public function destroy($id)
{
$video = \App\Models\Video::find($id);  
$video->delete();
  return response()->json([
           "msg" => "Success",

    ], 200

    );
}


}