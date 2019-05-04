<?php
$name = $_POST['name'];
$score = $_POST['score'];

	if ( !( $database = mysqli_connect( "localhost", "root", "galaxyh94" ) ) )
    die( "Could not connect to database </body></html>" );
	if ( !mysqli_select_db( $database , "game" ) )
		die( "Could not open game database </body></html>" );
	$query = "SELECT * FROM `ranking` ORDER BY `score` DESC";
	$sql = "INSERT INTO `ranking` (`name`,`score`) VALUES ('".$name."',".$score.")";//value 的 $name 不一定是數字 要加 '' 使其成為字串
	if($name != "")
	{
		if(!mysqli_query($database , $sql )){
			print( "<p>Could not insert data!</p>" );
			die( mysqli_error() . "</body></html>" );
		}
	}
	if ( !( $result = mysqli_query($database , $query ) ))
	{
		print( "<p>Could not execute query!</p>" );
		die( mysqli_error() . "</body></html>" );
	}
	mysqli_close( $database );
	$index = 1;
	print("<table>");
	while ( $row = mysqli_fetch_row( $result ) )//每抓到一行resultr就
	{
		print( "<tr>" );
		print("<td>$index</td>");
		$index++;
		foreach ( $row as $value )//每抓到一個row的資料就
		{
		   print( "<td>$value</td>" );
		}
		print( "</tr>" );
		if($index === 11)
		{
		   break;
		}
	}
	print("</table>");


?>