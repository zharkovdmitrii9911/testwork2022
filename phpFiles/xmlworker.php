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
        /*foreach ($jsonArray->User as $User) {
            
            if ($User->LogIn==$LogIn) {
               return true;
            }
         }
         return false;*/
    }
    public function AddNew($User)
    {
        /*$xml = simplexml_load_file('Users.xml');
        $item = $xml->addChild('User');
        $item->addChild('LogIn', $User ->LogIn);
        $item->addChild('Name', $User ->Name);
        $item->addChild('Pass', password_hash($User ->Pass, PASSWORD_DEFAULT));
        $item->addChild('Email', $User ->Email);
        file_put_contents('Users.xml', $xml->asXML());*/

        /*$pass = ($User ->Pass, PASSWORD_DEFAULT)
   
        file_put_contents('Users.json', json_encode($user, JSON_FORCE_OBJECT));
        header('Location: '. $_SERVER['HTTP_REFERER']);*/

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
        /*$xml = simplexml_load_file('Users.xml');
        foreach ($xml->User as $UserDB) {
            if ($UserDB->LogIn==$User->LogIn) {
               
               if (password_verify($User->Pass, $UserDB->Pass)) {
                return true;
                } else {
                return false;
                }
            }      
         }
         return false;

         $json = file_get_contents('Users.json');
         $jsonArray = json_decode($json, true);
         foreach ($jsonArray->User as $User) {
            if ($UserDB->LogIn==$User->LogIn) {
                if (password_verify($User->Pass, $UserDB->Pass)) {
                 return true;
                 } else {
                 return false;
                 }
             }      
          }
          return false;*/


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
        /*$xml = simplexml_load_file('Users.xml');
        foreach ($xml->User as $User) {
            if ($User->LogIn==$LogIn) {
               
               $user ->LogIn = $User->LogIn;
               $user ->Name = $User ->Name;
               $user ->Pass = $User->Pass;
               $user ->Email = $User->Email;
               return $user;
            }      
         }
         return $user;*/


         /*$json = file_get_contents('Users.json');
         $jsonArray = json_decode($json, true);
         foreach ($jsonArray->User as $User) {
             if ($User->LogIn==$LogIn) {
                $user ->LogIn = $User->LogIn;
                $user ->Name = $User->Name;
                $user ->Pass = $User->Pass;
                $user ->Email = $User->Email;
                return $user;
             }
          }
          return $user;*/
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