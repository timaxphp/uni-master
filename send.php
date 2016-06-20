<?php
require 'class.simple_mail.php';

$to = "ShershnevAV@uniastrum.com";
$to2 = "shershnev@gmail.com";
$to3 = "osintsev.k.s@gmail.com";
$from = "info@unigarant.ru";

if(isset($_GET['callback'])) {
    $mailer = new SimpleMail();
    
    $message = "<p>Телефон: ".$_POST['phone']."</p>";

    $mailer
        ->setTo($to, $to)
        ->setTo($to2, $to2)
        ->setTo($to3, $to3)
        ->setSubject('Обратный звонок')
        ->setFrom($from, $from)
        ->addGenericHeader('X-Mailer', 'PHP/' . phpversion())
        ->addGenericHeader('Content-Type', 'text/html; charset="utf-8"')
        ->setMessage($message);

    $send = $mailer->send();
    if ($send) {
        $return = array("success" => true);
    } else {
        $return = array("success" => false, "error" => $mailer->debug());
    }
    echo json_encode($return);
}

if(isset($_GET['order_form'])) {
    $mailer = new SimpleMail();
    
    $message = "<p>Имя: ".$_POST['name']."</p>";
    $message .= "<p>Контакт: ".$_POST['contact']."</p>";

    $mailer
        ->setTo($to, $to)
        ->setTo($to2, $to2)
        ->setTo($to3, $to3)        
        ->setSubject('Получить гарантию')
        ->setFrom($from, $from)
        ->addGenericHeader('X-Mailer', 'PHP/' . phpversion())
        ->addGenericHeader('Content-Type', 'text/html; charset="utf-8"')
        ->setMessage($message);

    $send = $mailer->send();
    if ($send) {
        $return = array("success" => true);
    } else {
        $return = array("success" => false, "error" => $mailer->debug());
    }
    echo json_encode($return);
}
    

if(isset($_GET['agent_form'])) {
    $mailer = new SimpleMail();
    
    $message = "<p>ФОРМА ОГРАНИЗАЦИИ: ".$_POST['org_form']."</p>";
    $message .= "<p>НАИМЕНОВАНИЕ ОРГАНИЗАЦИИ: ".$_POST['org_name']."</p>";
    $message .= "<p>ИНН: ".$_POST['iin']."</p>";
    $message .= "<p>ФАКТИЧЕСКИЙ АДРЕС МЕСТОНАХОЖДЕНИЯ: ".$_POST['address']."</p>";
    $message .= "<p>ФАМИЛИЯ: ".$_POST['name1']."</p>";
    $message .= "<p>ИМЯ: ".$_POST['name2']."</p>";
    $message .= "<p>ОТЧЕСТВО: ".$_POST['name3']."</p>";
    $message .= "<p>МОБИЛЬНЫЙ ТЕЛЕФОН ДЛЯ ПОЛУЧЕНИЯ КОДА: ".$_POST['mobile']."</p>";
    $message .= "<p>EMAIL: ".$_POST['email']."</p>";

    $mailer
        ->setTo($to, $to)
        ->setTo($to2, $to2)
        ->setTo($to3, $to3)        
        ->setSubject('Агентсткая форма')
        ->setFrom($from, $from)
        ->addGenericHeader('X-Mailer', 'PHP/' . phpversion())
        ->addGenericHeader('Content-Type', 'text/html; charset="utf-8"')
        ->setMessage($message);

    $send = $mailer->send();
    if ($send) {
        $return = array("success" => true);
    } else {
        $return = array("success" => false, "error" => $mailer->debug());
    }
    echo json_encode($return);
}
    
exit();