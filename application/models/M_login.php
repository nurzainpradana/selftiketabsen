<?php
defined('BASEPATH') or exit('No Direct script access allowed');

class M_login extends CI_Model
{
    function checkUserId($username, $pass)
    {
        $this->db->select("u.username, p.*, u.level");
        $this->db->from("tb_user u");
        $this->db->join("tb_pegawai p", "u.id_pegawai = p.id");
        $this->db->where("u.status", 1);
        $this->db->where("u.username", $username);
        $this->db->where("u.password", md5($pass));

        return $this->db->get()->row();
    }
}
