<!-- Content Wrapper. Contains page content -->
<div class="loading"></div>
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Data Pegawai</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Beranda</a></li>
                        <li class="breadcrumb-item active">Pegawai</li>
                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card card-danger card-outline">
                        <form action="#" id="pegawaiForm" method="post" target="_blank">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="exampleSelectBorder">NIK Pegawai</label>
                                            <input type="text" name="id_pegawai" id="inputIdPegawai" hidden>
                                            <input name="NIK" type="text" class="form-control form-control-border border-width-2" id="inputNIK" autocomplete="off" required placeholder="NIK Pegawai">
                                            <span class='form-control-feedback text-danger'></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="exampleSelectBorder">Nama Pegawai <span class="text-danger">*</span></label>
                                            <input name="nama_pegawai" type="text" class="form-control form-control-border border-width-2" id="inputNamaPegawai" autocomplete="off" required placeholder="Nama Pegawai">
                                            <span class='form-control-feedback text-danger'></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="exampleSelectBorder">Unit <span class="text-danger">*</span></label>
                                            <select class="form-control form-control-border" id="inputUnit" name="unit" required>
                                                
                                                <option value="">-- Pilih Unit --</option>
                                                <?php
                                                if(isset($unit))
                                                {
                                                    
                                                foreach($unit as $u)
                                                {
                                                    ?>
                                                    <option value="<?= $u->id;?>"><?= $u->nama_unit;?></option>
                                                    <?php
                                                }
                                                }
                                                ?>
                                            </select>
                                            <span class='form-control-feedback text-danger'></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <button type="button" id="btnSave" class="btn btn-primary">Simpan</button>
                                        <button type="button" id="btnUpdate" class="btn btn-success" hidden>Update</button>
                                        <button type="reset" id="btnCancel" class="btn btn-secondary">Reset</button>
                                    </div>
                                </div>
                            </div>
                    </div>
                    </form>

                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="card card-secondary card-outline">
                        <div class="card-header">
                            <div class="card-title">
                                Daftar Pegawai
                                <br>
                            </div>
                        </div>
                        <div class="card-body">

                            <div class="row">
                                <div class="col-12">
                                    <table id="tablePegawai" class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <!-- <th>#</th> -->
                                                <th>NIK</th>
                                                <th>Nama Pegawai</th>
                                                <th>Unit</th>
                                                <th>#</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- /.content-wrapper -->
<script src="<?= base_url() . 'assets/js/pegawai.js'; ?>"></script>