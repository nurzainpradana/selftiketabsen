
<?php
defined('BASEPATH') or exit('No Direct script access allowed');

class M_pegawai extends CI_Model
{

    var $table      = "tb_pegawai";
    var $column     = array("", "nama", "nip_pegawai", "nama_jabatan", "unit_kerja");
    var $order      = array("nama" => "asc");

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->search   = '';
    }





    private function _get_datatables_query()
    {
        $this->db->select("p.*, u.nama_unit");
        $this->db->from("tb_pegawai p");
        $this->db->join("tb_unit u", "u.id = p.id_unit", "left");
        $this->db->order_by("p.nama_pegawai", "asc");

        $i      = 0;

        foreach ($this->column as $item) {
            if (isset($_POST['search'])) {
                if ($_POST['search']['value']) ($i === 0) ? $this->db->like($item, $_POST['search']['value']) : $this->db->or_like($item, $_POST['search']['value']);
                $column[$i]     = $item;
            }

            $i++;
        }

        if (isset($_POST['order'])) {
            $this->db->order_by($column[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
        } else if (isset($this->order)) {
            $order      = $this->order;

            $this->db->order_by(key($order), $order[key($order)]);
        }
    }

    function getDetailPegawai($id_pegawai)
    {
        $this->db->select("*");
        $this->db->from("tb_pegawai");
        $this->db->where("id", $id_pegawai);

        return $this->db->get()->row();
    }


    function loadDataPegawaiDatatables()
    {
        $this->_get_datatables_query();

        if (isset($_POST['length'])) {
            if ($_POST['length'] != -1)
                $this->db->limit($_POST['length'], $_POST['start']);
        }
        $query      = $this->db->get();

        return $query->result();
    }

    public function count_filtered()
    {
        $this->_get_datatables_query();

        $query  = $this->db->get();

        return $query->num_rows();
    }

    public function count_all()
    {
        $this->db->from($this->table);
        return $this->db->count_all_results();
    }

    public function loadPegawaiList()
    {
        $this->_get_datatables_query();

        return $this->db->get()->result();
    }

    public function loadPegawaiOptionList()
    {
        $this->db->select("p.*");
        $this->db->from("tb_pegawai p");
        // $this->db->join("tb_user u", "u.id_pegawai = p.id", "left");
        // $this->db->where('u.id_pegawai', null);
        $this->db->order_by("p.nama_pegawai", "asc");

        return $this->db->get()->result();
    }

    
}
