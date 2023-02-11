<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Pegawai extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        if ($this->session->userdata('logged') !== TRUE) {
            redirect(base_url() . 'index.php/Login');
        }

        $this->load->model(array("M_pegawai", "M_unit"));
    }

    function index()
    {
        $datas['page_title']            = "Pegawai";

        $datas['unit']                  = $this->M_unit->loadUnitList();

        $this->load->view('layout/v_header', $datas);
        $this->load->view('layout/v_top_menu');
        $this->load->view('layout/v_sidebar');
        $this->load->view('pegawai/v_pegawai');
        $this->load->view('layout/v_footer');
    }

    function loadPegawaiListDatatables()
    {

        $pegawai               = $this->M_pegawai->loadDataPegawaiDatatables();

        $data               = array();
        $no                 = $_POST['start'];

        $i                  = 0;
        foreach ($pegawai as $item) {
            $no++;
            $row        = array();
            $row[]      = $item->NIK;
            $row[]      = $item->nama_pegawai;
            $row[]      = $item->nama_unit;
            $row[]      = "
            <button data-id='$item->id' class='btn btn-xs btn-success' onclick='editPegawai($item->id)' title='Edit Pegawai'><i class='fa fa-edit'></i></button>
            <button data-id='$item->id' class='btn btn-xs btn-danger' onclick='deletePegawai($item->id)' title='Hapus Pegawai'><i class='fa fa-trash'></i></button>
            ";

            $data[]     = $row;
            $i++;
        }

        $output         = array(
            "draw"              => $_POST['draw'],
            "recordsTotal"      => $this->M_pegawai->count_all(),
            "recordsFiltered"   => $this->M_pegawai->count_filtered(),
            "data"              => $data,
        );

        // output to json format

        echo json_encode($output);
    }

    function AddPegawai()
    {
        $nama_pegawai       = $this->input->post("nama_pegawai");
        $NIK                = $this->input->post("NIK");
        $unit               = $this->input->post("unit");

        $data       = array(
            "nama_pegawai"      => $nama_pegawai,
            "NIK"               => $NIK,
            "id_unit"           => $unit
        );

        $insert             = $this->M_crud->insert("tb_pegawai", $data);

        if ($insert) {
            $response_status        = "success";
            $response_message       = "Berhasil menambahkan Pegawai";
        } else {
            $response_status        = "failed";
            $response_message       = "Gagal menambahkan Pegawai";
        }

        echo json_encode(array(
            "status"        => $response_status,
            "message"       => $response_message
        ));
    }

    function UpdatePegawai()
    {
        $id_pegawai         = $this->input->post("id_pegawai");
        $nama_pegawai       = $this->input->post("nama_pegawai");
        $NIK                = $this->input->post("NIK");
        $unit               = $this->input->post("unit");

        $data       = array(
            "nama_pegawai"      => $nama_pegawai,
            "NIK"               => $NIK,
            "id_unit"           => $unit
        );

        $where      = array(
            "id"                => $id_pegawai
        );

        $update             = $this->M_crud->update("tb_pegawai", $data, $where);

        if ($update) {
            $response_status        = "success";
            $response_message       = "Berhasil mengedit Pegawai";
        } else {
            $response_status        = "failed";
            $response_message       = "Gagal mengedit Pegawai";
        }

        echo json_encode(array(
            "status"        => $response_status,
            "message"       => $response_message
        ));
    }


    function edit()
    {
        $id_pegawai     = $this->input->post("id_pegawai");

        $pegawai        = $this->M_pegawai->getDetailPegawai($id_pegawai);

        if ($pegawai) {
            $response_data      = $pegawai;
            $response_status    = "success";
            $response_message   = "Successfully";
        } else {
            $response_data      = null;
            $response_status    = "failed";
            $response_message   = "Gagal mendapatkan Data Pegawai";
        }

        echo json_encode(array(
            "status"        => $response_status,
            "message"       => $response_message,
            "data"          => $response_data
        ));
    }

    function delete()
    {
        $id_pegawai         = $this->input->post("id_pegawai");

        $where             = array(
            "id"            => $id_pegawai
        );

        $delete     = $this->M_crud->delete("tb_pegawai", $where);

        if ($delete) {
            $response_status        = "success";
            $response_message       = "Berhasil menghapus Data Pegawai";
        } else {
            $response_status        = "failed";
            $response_message       = "Gagal menghapus Data Pegawai";
        }

        echo json_encode(array(
            "status"        => $response_status,
            "message"       => $response_message
        ));
    }

    function loadPegawaiListOption()
    {
        $pegawai           = $this->M_pegawai->loadPegawaiOptionList();

        $result     = "<option value=''>-- Pilih Pegawai --</option>";

        foreach ($pegawai as $item) {
            $result .= "<option value='$item->id'>$item->nama_pegawai</option>";
        }

        echo $result;
    }
}
