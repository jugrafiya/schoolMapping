<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dbdbdb";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$yearr = 0;
if(isset($_GET["year"])){
	$yearr = $_GET["year"];
}

$colArr=array();


	if ($yearr >0){
		$clAYear = "cl.A_".$yearr;
		
		$clEYear = "cl.E_".$yearr;
		
		$sql = "select cl.id college_id, cl.name college_name,cl.logo college_logo, cl.lat lat, cl.lng lng, cl.web_url web_url, $clAYear accepted, $clEYear enrolled  from college cl where $clAYear > 0 and $clEYear = 0";

		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			// output data of each row
			while($row = $result->fetch_assoc()) {
				$myObj = new \stdClass();
				$myObj->col_id = $row["college_id"];
				$myObj->col_nm = $row["college_name"];
				$myObj->col_lg = $row["college_logo"];
				$myObj->lat = $row["lat"];
				$myObj->lng = $row["lng"];
				$myObj->web_url = $row["web_url"];
				$myObj->accepted = $row["accepted"];
				$myObj->enrolled = $row["enrolled"];
				
				array_push($colArr,$myObj);
			}
		}
		

		$sql = "select cl.id college_id, cl.name college_name,cl.logo college_logo, cl.lat lat, cl.lng lng, cl.web_url web_url,   $clAYear accepted, $clEYear enrolled from college cl where $clEYear  > 0 and $clAYear =0 ";
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			// output data of each row
			while($row = $result->fetch_assoc()) {
				$myObj = new \stdClass();
				$myObj->col_id = $row["college_id"];
				$myObj->col_nm = $row["college_name"];
				$myObj->col_lg = $row["college_logo"];
				$myObj->lat = $row["lat"];
				$myObj->lng = $row["lng"];
				$myObj->web_url = $row["web_url"];
				$myObj->accepted = $row["accepted"];
				$myObj->enrolled = $row["enrolled"];

				
				array_push($colArr,$myObj);
			}
		}
		
		$sql = "select cl.id college_id, cl.name college_name,cl.logo college_logo, cl.lat lat, cl.lng lng, cl.web_url web_url,   $clAYear accepted, $clEYear enrolled from college cl where $clEYear  > 0 and $clAYear >0 ";
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			// output data of each row
			while($row = $result->fetch_assoc()) {
				$myObj = new \stdClass();
				$myObj->col_id = $row["college_id"];
				$myObj->col_nm = $row["college_name"];
				$myObj->col_lg = $row["college_logo"];
				$myObj->lat = $row["lat"];
				$myObj->lng = $row["lng"];
				$myObj->web_url = $row["web_url"];
				$myObj->accepted = $row["accepted"];
				$myObj->enrolled = $row["enrolled"];

				
				array_push($colArr,$myObj);
			}
		}
		
	}
	else
	{

		$sql = "select cl.id college_id, cl.name college_name,cl.logo college_logo, cl.lat lat, cl.lng lng, cl.web_url web_url from college cl";
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			// output data of each row
			while($row = $result->fetch_assoc()) {
				$myObj = new \stdClass();
				$myObj->col_id = $row["college_id"];
				$myObj->col_nm = $row["college_name"];
				$myObj->col_lg = $row["college_logo"];
				$myObj->lat = $row["lat"];
				$myObj->lng = $row["lng"];
				$myObj->web_url = $row["web_url"];
				$myObj->accepted = "";
				$myObj->enrolled = "";

				
				array_push($colArr,$myObj);
			}
		}
	}
	

$res = json_encode($colArr);
echo ($res);



$conn->close();
?>