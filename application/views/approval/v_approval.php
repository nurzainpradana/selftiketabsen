<!-- Content Wrapper. Contains page content -->
<div class="loading"></div>
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Approval</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active">Approval</li>
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
                    <div class="card card-success card-outline">
                        <form action="#" id="jabatanForm" method="post" target="_blank">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="exampleSelectBorder">Pegawai <span class="text-danger">*</span></label>
                                            <select class="form-control form-control-border" id="inputPegawai" name="pegawai" required>
                                                <option value="">-- Pilih Pegawai --</option>
                                            </select>
                                            <span class='form-control-feedback text-danger'></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="exampleSelectBorder">Level <span class="text-danger">*</span></label>
                                            <select class="form-control form-control-border" id="inputlevelApproval" name="level_approval" required>
                                                <option value="">-- Pilih Level Approval --</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                            <span class='form-control-feedback text-danger'></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <button type="button" id="btnSave" class="btn btn-primary">Save</button>
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
                    <div class="card card-success card-outline">
                        <div class="card-header">
                            <div class="card-title">
                                Daftar Approval List
                                <br>
                            </div>
                        </div>
                        <div class="card-body">

                            <div class="row">
                                <div class="col-12">
                                    <table id="tableApproval" class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Nama Pegawai</th>
                                                <th>Nama Jabatan</th>
                                                <th>Unit Kerja</th>
                                                <th>Level Approval</th>
                                                <th>Action</th>
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
<script src="<?= base_url() . 'assets/js/approval.js'; ?>"></script>