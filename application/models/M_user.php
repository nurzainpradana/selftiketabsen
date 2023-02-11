
<?php
defined('BASEPATH') or exit('No Direct script access allowed');

class M_user extends CI_Model
{

    var $table      = "tb_user u";
    var $column     = array("nama_pegawai", "(case level when 1 then 'Pegawai' when 2 then 'Manager' when 3 then 'Administrator')", "");
    var $order      = array("nama_pegawai" => "asc");

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->search   = '';
    }

    

    public function checkUsername($username)
    {
        // echo "Test";

        $this->db->select("*");
        $this->db->from("tb_user");
        $this->db->where("username", $username);

        // return $this->db->get()->row();
    }

    private function _get_datatables_query()
    {
        $this->db->select("u.*, p.nama_pegawai, case level when 1 then 'Pegawai' when 2 then 'Manager' when 3 then 'Administrator' end level_desc");
        $this->db->from("tb_user u");
        $this->db->join("tb_pegawai p", "p.id = u.id_pegawai", "left");

        $i      = 0;

        foreach ($this->column as $item) {
            if (isset($_POST['search']) && $item != "") {
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

    


    public function loadDataUserDatatables()
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

    public function getDetailUser($id_user)
    {
        $this->db->select("*");
        $this->db->from("tb_user");
        $this->db->where("id", $id_user);

        return $this->db->get()->row();
    }
}
