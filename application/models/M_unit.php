
<?php
defined('BASEPATH') or exit('No Direct script access allowed');

class M_unit extends CI_Model
{

    var $table      = "tb_unit";
    var $column     = array("id", "nama_unit");
    var $order      = array("nama_unit" => "asc");

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->search   = '';
    }

    public function loadUnitList()
    {
        $this->db->select("*");
        $this->db->from("tb_unit");
        $this->db->where("status", 1);

        return $this->db->get()->result();
    }





    private function _get_datatables_query()
    {
        $this->db->select("*");
        $this->db->from("tb_unit u");

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


    function loadDataUnitDatatables()
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

    public function loadJabatanList()
    {
        $this->db->select("*");
        $this->db->from($this->table);

        return $this->db->get()->result();
    }

    public function getDetailUnit($id_unit)
    {
        $this->db->select("*");
        $this->db->from("tb_unit");
        $this->db->where("id", $id_unit);

        return $this->db->get()->row();
    }
}