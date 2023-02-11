<!-- Main Sidebar Container -->
<aside class="main-sidebar sidebar-light-danger elevation-1">
  <!-- Brand Logo -->
  <a href="#" class="brand-link">
    <img width='10' src="<?= base_url(); ?>/assets/dist/img/telkom_akses.png" alt="AdminLTE Logo" class="brand-image" style="opacity: .8">
    <span class="brand-text font-weight-bold">Self Tiket Absen</span>
  </a>

  <!-- Sidebar -->
  <div class="sidebar">

    <?php

    $level    = $this->session->userdata("level");

    ?>

    <!-- Sidebar Menu -->
    <nav class="mt-2">
      <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

        <?php
        if ($level == 1) {
        ?>
          <li class="nav-header text-bold">
            MASTER DATA
          </li>
          <li class='nav-item'>
            <a href="<?= base_url('index.php/Pegawai'); ?>" class="nav-link <?= $this->router->fetch_class() == 'Pegawai' ? 'active' : ''; ?>">
              <p>Pegawai</p>
            </a>
          </li>
          <li class='nav-item'>
            <a href="<?= base_url('index.php/Unit'); ?>" class="nav-link <?= $this->router->fetch_class() == 'Unit' ? 'active' : ''; ?>">
              <p>Unit</p>
            </a>
          </li>
          <li class='nav-item'>
            <a href="<?= base_url('index.php/User'); ?>" class="nav-link <?= $this->router->fetch_class() == 'User' ? 'active' : ''; ?>">
              <p>User</p>
            </a>
          </li>



          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
        <?php
        } else if($level == 2)
        {
          ?>
  <li class="nav-header text-bold">
            APROVAL
          </li>
          <li class='nav-item'>
            <a href="<?= base_url('index.php/TiketAbsen'); ?>" class="nav-link <?= $this->router->fetch_class() == 'TiketAbsen' ? 'active' : ''; ?>">
              <p>Tiket Absen</p>
            </a>
          </li>

        <?php
        }
        ?>
      </ul>
    </nav>
    <!-- /.sidebar-menu -->
  </div>
  <!-- /.sidebar -->
</aside>