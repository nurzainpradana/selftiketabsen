<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Unit extends CI_Controller
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
        $datas['page_title']            = "Jabatan";

        $this->load->view('layout/v_header', $datas);
        $this->load->view('layout/v_top_menu');
        $this->load->view('layout/v_sidebar');
        $this->load->view('unit/v_unit');
        $this->load->view('layout/v_footer');
    }

    function loadUnitListDatatables()
    {

        $jabatan            = $this->M_unit->loadDataUnitDatatables();

        $data               = array();
        $no                 = $_POST['start'];

        $i                  = 0;
        foreach ($jabatan as $item) {
            $no++;
            $row        = array();

            $row[]      = $item->nama_unit;
            $row[]      = "
            <button data-id='$item->id' class='btn btn-xs btn-success' onclick='editUnit($item->id)' title='Edit Unit'><i class='fa fa-edit'></i></button>
            <button data-id='$item->id' class='btn btn-xs btn-danger' onclick='deleteUnit($item->id)' title='Hapus Unit'><i class='fa fa-trash'></i></button>
            ";



            $data[]     = $row;
            $i++;
        }

        $output         = array(
            "draw"              => $_POST['draw'],
            "recordsTotal"      => $this->M_unit->count_all(),
            "recordsFiltered"   => $this->M_unit->count_filtered(),
            "data"              => $data,
        );

        // output to json format

        echo json_encode($output);
    }

    function Add()
    {
        $nama_unit          = $this->input->post("nama_unit");

        $data       = array(
            "nama_unit"      => $nama_unit
        );

        $insert             = $this->M_crud->insert("tb_unit", $data);

        if ($insert) {
            $response_status        = "success";
            $response_message       = "Berhasil menambahkan Unit";
        } else {
            $response_status        = "failed";
            $response_message       = "Gagal menambahkan Unit";
        }

        echo json_encode(array(
            "status"        => $response_status,
            "message"       => $response_message
        ));
    }

    function Update()
    {
        $id_unit            = $this->input->post("id_unit");
        $nama_unit          = $this->input->post("nama_unit");

        $data       = array(
            "nama_unit"     => $nama_unit,
        );

        $where      = array(
            "id"            => $id_unit
        );

        $update             = $this->M_crud->update("tb_unit", $data, $where);

        if ($update) {
            $response_status        = "success";
            $response_message       = "Berhasil mengedit Unit";
        } else {
            $response_status        = "failed";
            $response_message       = "Gagal mengedit Unit";
        }

        echo json_encode(array(
            "status"        => $response_status,
            "message"       => $response_message
        ));
    }


    function edit()
    {
        $id_jabatan     = $this->input->post("id_jabatan");

        $jabatan        = $this->M_unit->getDetailUnit($id_jabatan);

        if ($jabatan) {
            $response_data      = $jabatan;
            $response_status    = "success";
            $response_message   = "Successfully";
        } else {
            $response_data      = null;
            $response_status    = "failed";
            $response_message   = "Gagal mendapatkan Data Jabatan";
        }

        echo json_encode(array(
            "status"        => $response_status,
            "message"       => $response_message,
            "data"          => $response_data
        ));
    }

    function delete()
    {
        $id_unit             = $this->input->post("id_unit");

        $where             = array(
            "id"            => $id_unit
        );

        $delete     = $this->M_crud->delete("tb_unit", $where);

        if ($delete) {
            $response_status        = "success";
            $response_message       = "Berhasil menghapus Data Unit";
        } else {
            $response_status        = "failed";
            $response_message       = "Gagal menghapus Data Unit";
        }

        echo json_encode(array(
            "status"        => $response_status,
            "message"       => $response_message
        ));
    }

    function loadJabatanListOption()
    {
        $jabatan           = $this->M_jabatan->loadJabatanList();

        $result     = "<option value=''>-- Pilih Jabatan --</option>";

        foreach ($jabatan as $item) {
            $result .= "<option value='$item->id_jabatan'>$item->nama_jabatan</option>";
        }

        echo $result;
    }
}
