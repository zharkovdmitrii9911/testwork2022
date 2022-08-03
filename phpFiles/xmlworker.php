<?php
class User
{
    public $LogIn="nonFound",$Name="nonFound",$Pass="nonFound",$Email="nonFound";
}

class XMLworker
{
    public function Search($LogIn)
    {
        $json = file_get_contents('Users.json');
        $jsonArray = json_decode($json, true);

        foreach ( $jsonArray  as $key => $value){        
            if (in_array( $LogIn, $value)) 
                {          
                    return true;          
                }
            } 
            return false;
    }
    public function SearchEmail($Email)
    {
        $json = file_get_contents('Users.json');
        $jsonArray = json_decode($json, true);

        foreach ( $jsonArray  as $key => $value){        
            if (in_array( $Email, $value)) 
                {          
                    return true;          
                }
            } 
            return false;
    }
    public function AddNew($User)
    {
       

        $LogIn=$User ->LogIn;
        $Name=$User ->Name;
        $Pass=password_hash($User ->Pass, PASSWORD_DEFAULT);
        $Email=$User ->Email;
        $file = file_get_contents('Users.json');
        $jsonArray = json_decode($file,TRUE);  
        unset($file);
        $jsonArray[] = array(
            'LogIn'=>$LogIn,
            'Name'=>$Name, 
            'Pass'=>$Pass,
            'Email'=>$Email, 
        );
        file_put_contents('Users.json', json_encode($jsonArray));
        
        
        



  
    }
    public function LogIn($User)
    {
        $json = file_get_contents('Users.json');
        $jsonArray = json_decode($json, true);

        foreach ( $jsonArray  as $key => $value){        
            if (in_array( $User->LogIn, $value)) 
                {          
                    if (password_verify($User->Pass,  $value['Pass'])) {
                        return true;
                        } else {
                        return false;
                        }         
                }
            } 
            return false;
           
    }
    public function Read($LogIn)
    {
        $user = new User();
        
          $json = file_get_contents('Users.json');
        $jsonArray = json_decode($json, true);

        foreach ( $jsonArray  as $key => $value){        
            if (in_array( $LogIn, $value)) 
                {          
                    $user ->LogIn = $value['LogIn'];
                    $user ->Name = $value['Name'];
                    $user ->Pass = $value['Pass'];
                    $user ->Email = $value['Email'];
                    return $user;          
                }
            } 
            return false;
    }
}

/*$bar = new XMLworker;
$user = new User();
$user ->LogIn = 'ase';
$user ->Pass = 'ase';
$user ->Email = 'ase';
$bar->Write($user);
#$a = $bar->Read('ads1');
#print $a->LogIn;*/


?>