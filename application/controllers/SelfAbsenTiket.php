<?php
defined('BASEPATH') or exit('No direct script access allowed');

class SelfAbsenTicket extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        if ($this->session->userdata('logged') !== TRUE) {
            redirect(base_url() . 'index.php/Login');
        }

        $this->load->model(array(
            "M_pegawai", "M_user", "M_self_absen_ticket"
        ));
    }

    function index()
    {
        $datas['page_title']            = "Self Absen Ticket";

        $this->load->view('layout/v_header', $datas);
        $this->load->view('layout/v_top_menu');
        $this->load->view('layout/v_sidebar');
        $this->load->view('user/v_user');
        $this->load->view('layout/v_footer');
    }

    function loadUserListDatatables()
    {

        $jabatan            = $this->M_user->loadDataUserDatatables();

        $data               = array();
        $no                 = $_POST['start'];

        $i                  = 0;
        foreach ($jabatan as $item) {
            $no++;
            $row        = array();

            $row[]      = $item->nama_pegawai;
            $row[]      = $item->username;
            $row[]      = $item->level_desc;
            $row[]      = "
            <button data-id='$item->id' class='btn btn-xs btn-success' onclick='edit($item->id)' title='Edit User'><i class='fa fa-edit'></i></button>
            <button data-id='$item->id' class='btn btn-xs btn-danger' onclick='deleteUser($item->id)' title='Hapus User'><i class='fa fa-trash'></i></button>
            ";

            $data[]     = $row;
            $i++;
        }

        $output         = array(
            "draw"              => $_POST['draw'],
            "recordsTotal"      => $this->M_user->count_all(),
            "recordsFiltered"   => $this->M_user->count_filtered(),
            "data"              => $data,
        );

        // output to json format

        echo json_encode($output);
    }

    function add()
    {
        $id_pegawai                 = $this->input->post("pegawai");
        $username                   = $this->input->post("username");
        $password                   = md5($this->input->post("password"));
        $level                      = $this->input->post("level_user");

        $check                      = $this->M_user->checkUsername($username);

        if ($check) {
            $response_status    = "failed";
            $response_message   = "Username sudah terdaftar";
        } else {
            $data           = array(
                "id_pegawai"                    => $id_pegawai,
                "username"                      => $username,
                "password"                      => $password,
                "level"                         => $level
            );

            $insert         = $this->M_crud->insert("tb_user", $data);

            if ($insert) {
                $response_status        = "success";
                $response_message       = "Berhasil menyimpan data User";
            } else {
                $response_status        = "failed";
                $response_message       = "Gagal menyimpan data User";
            }
        }



        echo json_encode(array(
            "status"        => $response_status,
            "message"       => $response_message
        ));
    }

    function edit()
    {
        $id_user            = $this->input->post("id_user");

        $user        = $this->M_user->getDetailUser($id_user);

        if ($user) {
            $response_data      = $user;
            $response_status    = "success";
            $response_message   = "Berhasil";
        } else {
            $response_data      = null;
            $response_status    = "failed";
            $response_message   = "Gagal mendapatkan Data User";
        }

        echo json_encode(array(
            "status"        => $response_status,
            "message"       => $response_message,
            "data"          => $response_data
        ));
    }

    function Update()
    {
        $id_pegawai                 = $this->input->post("pegawai");
        $username                   = $this->input->post("username");
        $password                   = md5($this->input->post("password"));
        $level                      = $this->input->post("level_user");
        $id_user                    = $this->input->post("id_user");


        $data           = array(
            "id_pegawai"                    => $id_pegawai,
            "username"                      => $username,
            "level"                         => $level
        );

        if($password != null && $password != "" && $password != " ")
        {
            $data['password']           = $password;
        }

        $where      = array(
            "id"        => $id_user
        );

        $update         = $this->M_crud->update("tb_user", $data, $where);

        if ($update) {
            $response_status        = "success";
            $response_message       = "Berhasil mengedit User";
        } else {
            $response_status        = "failed";
            $response_message       = "Gagal mengedit User";
        }

        echo json_encode(array(
            "status"        => $response_status,
            "message"       => $response_message
        ));
    }

    function delete()
    {
        $id_user             = $this->input->post("id_user");

        $where             = array(
            "id"            => $id_user
        );

        $delete     = $this->M_crud->delete("tb_user", $where);

        if ($delete) {
            $response_status        = "success";
            $response_message       = "Berhasil menghapus User";
        } else {
            $response_status        = "failed";
            $response_message       = "Gagal menghapus User";
        }

        echo json_encode(array(
            "status"        => $response_status,
            "message"       => $response_message
        ));
    }
}
