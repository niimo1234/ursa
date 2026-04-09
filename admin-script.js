/* global URSAPlatform */

(function () {
  "use strict";

  var platform = window.URSAPlatform;
  if (!platform) {
    return;
  }

  var VIEW = document.body.dataset.adminView || "";
  var ATTACHMENTS_DB_NAME = "ursa_media_db";
  var ATTACHMENTS_STORE_NAME = "attachments";

  var TRANSLATIONS = {
    ar: {
      brand_admin: "URSA · المنصة الإدارية",
      lang_btn: "English",
      nav_overview: "النظرة العامة",
      nav_ministries: "إدارة الجهات",
      nav_admins: "حسابات الأدمن",
      nav_reports: "البلاغات",
      nav_settings: "الإعدادات",
      nav_logout: "تسجيل الخروج",
      nav_ministry_page: "صفحة الجهة",
      login_title: "تسجيل دخول الأدمن",
      login_desc: "سجّل الدخول باسم المستخدم وكلمة المرور والجهة التابعة للحساب.",
      username_label: "اسم المستخدم",
      username_placeholder: "مثال: pm_admin",
      password_label: "كلمة المرور",
      ministry_label: "الجهة / الوزارة / مجال العمل",
      ministry_placeholder: "اختر الجهة",
      login_btn: "تسجيل الدخول",
      register_btn: "إنشاء حساب أدمن",
      back_home: "العودة للرئيسية",
      no_account: "ليس لديك حساب أدمن؟",
      register_title: "تسجيل أدمن جديد",
      register_desc: "أنشئ حسابًا إداريًا مرتبطًا بجهة محددة داخل المنصة.",
      full_name_label: "الاسم الكامل",
      full_name_placeholder: "أدخل الاسم الكامل",
      email_label: "البريد الإلكتروني",
      email_placeholder: "name@example.com",
      phone_label: "رقم الهاتف",
      phone_placeholder: "11 رقمًا",
      national_id_label: "الرقم القومي",
      national_id_placeholder: "14 رقمًا",
      custom_ministry_label: "اسم الجهة الجديدة",
      custom_ministry_placeholder: "اكتب اسم الجهة أو الوزارة",
      confirm_password_label: "تأكيد كلمة المرور",
      create_account_btn: "تسجيل الأدمن",
      back_to_admin_login: "العودة لتسجيل دخول الأدمن",
      other_ministry_option: "جهة أخرى",
      overview_title: "لوحة التحكم الرئيسية",
      overview_subtitle_super: "رئاسة الوزراء تتحكم في المنصة بالكامل وتراجع الجهات والطلبات والإدارات.",
      overview_subtitle_regular: "لوحة تشغيل خاصة بجهتك مع جاهزية للتوسع المستقبلي.",
      stat_total_admins: "إجمالي الأدمنات",
      stat_active_ministries: "الجهات المعتمدة",
      stat_pending_requests: "طلبات الجهات الجديدة",
      stat_total_reports: "إجمالي البلاغات",
      quick_actions: "إجراءات سريعة",
      action_open_ministries: "إدارة الجهات",
      action_open_admins: "إدارة الأدمنات",
      action_open_reports: "مراجعة البلاغات",
      action_open_own_page: "فتح صفحة الجهة",
      action_open_portal: "الرجوع للبوابة",
      ministry_pages: "صفحات الجهات الأساسية",
      recent_activity: "آخر الأنشطة",
      empty_activity: "لا توجد أنشطة مسجلة بعد.",
      empty_reports: "لا توجد بلاغات حتى الآن.",
      empty_admins: "لا توجد حسابات أدمن.",
      empty_citizens: "لا يوجد مواطنون مسجلون بعد.",
      empty_requests: "لا توجد طلبات جهات جديدة حاليًا.",
      empty_ministries: "لا توجد جهات للعرض.",
      admins_title: "إدارة حسابات الأدمن",
      admins_subtitle: "عرض جميع الأدمنات وربطهم بالجهات والصلاحيات المناسبة.",
      citizens_title: "المواطنون المسجلون",
      reports_title: "إدارة البلاغات",
      reports_subtitle: "عرض البلاغات الحالية وتحديث حالتها ومراجعة الصور المرفقة.",
      settings_title: "إعدادات المنصة",
      settings_subtitle: "التحكم في الجلسة الحالية وإعادة تهيئة البيانات المحلية عند الحاجة.",
      ministries_title: "إدارة الجهات والطلبات",
      ministries_subtitle: "رئاسة الوزراء تعتمد الجهات الجديدة وتتابع هيكل المنصة.",
      pending_requests_title: "طلبات الجهات الجديدة",
      ministry_catalog_title: "دليل الجهات داخل المنصة",
      current_admin_title: "الحساب الحالي",
      local_storage_title: "إدارة البيانات المحلية",
      reset_platform: "إعادة تهيئة المنصة",
      logout_session: "تسجيل خروج الجلسة الحالية",
      table_username: "اسم المستخدم",
      table_name: "الاسم",
      table_email: "البريد الإلكتروني",
      table_phone: "الهاتف",
      table_national_id: "الرقم القومي",
      table_ministry: "الجهة",
      table_role: "الدور",
      table_status: "الحالة",
      table_type: "النوع",
      table_created: "تاريخ الإنشاء",
      table_actions: "الإجراءات",
      table_description: "الوصف",
      table_request_type: "نوع الطلب",
      table_category: "الفئة",
      table_location: "الموقع",
      table_date: "التاريخ",
      table_photo: "الصورة",
      table_id_card: "البطاقة",
      table_id: "المعرف",
      table_sender: "المرسل",
      status_active: "نشط",
      status_pending: "قيد الانتظار",
      status_rejected: "مرفوض",
      status_approved: "معتمد",
      role_super_admin: "أدمن رئيسي",
      role_ministry_admin: "أدمن جهة",
      type_core: "أساسية",
      type_custom: "مضافة",
      view_photo: "عرض الصورة",
      view_video: "عرض الفيديو",
      view_id_card: "عرض البطاقة",
      download_btn: "تحميل",
      approve_btn: "اعتماد",
      reject_btn: "رفض",
      rename_btn: "تعديل الاسم",
      delete_btn: "حذف",
      open_page_btn: "فتح الصفحة",
      confirm_reset_platform: "سيتم حذف البيانات المحلية وإعادة تهيئة الجهات والحسابات الافتراضية. هل تريد المتابعة؟",
      confirm_delete_admin: "هل تريد حذف حساب الأدمن المحدد؟",
      confirm_delete_ministry: "هل تريد حذف هذه الجهة؟ سيتم رفض الحسابات المرتبطة بها.",
      cannot_delete_core: "لا يمكن حذف الجهات الأساسية للنظام.",
      request_label: "طلب جديد",
      requested_by_label: "مقدم الطلب",
      no_ministry_access: "ليست لديك صلاحية للوصول إلى هذه الصفحة.",
      pending_notice: "الحساب أو الجهة ما زالت في انتظار الاعتماد من رئاسة الوزراء.",
      rejected_notice: "تم رفض الجهة أو الحساب. تواصل مع رئاسة الوزراء للمراجعة.",
      invalid_credentials: "بيانات الدخول غير صحيحة.",
      invalid_ministry: "الجهة المختارة لا تطابق الجهة المرتبطة بالحساب.",
      register_success_active: "تم إنشاء الحساب بنجاح ويمكنك تسجيل الدخول الآن.",
      register_success_pending: "تم تسجيل الطلب بنجاح وهو الآن في انتظار اعتماد رئاسة الوزراء.",
      rename_prompt: "أدخل الاسم الجديد للجهة",
      ministry_dashboard_title: "صفحة الجهة",
      ministry_dashboard_subtitle: "مساحة مستقلة لعرض بيانات الجهة وربطها بالمحتوى والصلاحيات لاحقًا.",
      assigned_admins: "الأدمنات المرتبطون بالجهة",
      ministry_metadata: "بيانات الجهة",
      ministry_permissions: "الصلاحيات الحالية",
      no_assigned_admins: "لا يوجد أدمنات مرتبطون بهذه الجهة حاليًا.",
      default_password_note: "الحسابات الأساسية متاحة بكلمات المرور الافتراضية المحددة مسبقًا داخل المشروع.",
      input_required: "برجاء استكمال جميع الحقول المطلوبة.",
      weak_password: "كلمة المرور يجب ألا تقل عن 8 أحرف.",
      invalid_phone: "رقم الهاتف يجب أن يكون 11 رقمًا.",
      invalid_national_id: "الرقم القومي يجب أن يكون 14 رقمًا.",
      password_mismatch: "كلمتا المرور غير متطابقتين.",
      username_exists: "اسم المستخدم مستخدم بالفعل.",
      email_exists: "البريد الإلكتروني مستخدم بالفعل.",
      phone_exists: "رقم الهاتف مستخدم بالفعل.",
      national_id_exists: "الرقم القومي مسجل بالفعل.",
      custom_ministry_required: "اكتب اسم الجهة الجديدة قبل المتابعة.",
      settings_summary: "تعمل المنصة حاليًا عبر Local Storage مع بنية قابلة للتوسع وربطها بقاعدة بيانات لاحقًا.",
      account_ministry: "الجهة الحالية",
      account_role: "الدور الحالي",
      account_status: "حالة الحساب",
      total_citizens: "إجمالي المواطنين",
      ministry_request_status: "حالة الطلب",
      seeded_account_badge: "افتراضي",
      remove_action_blocked: "لا يمكن حذف الحسابات الافتراضية الأساسية.",
      click_to_close: "اضغط في أي مكان للإغلاق"
    },
    en: {
      brand_admin: "URSA · Admin Platform",
      lang_btn: "العربية",
      nav_overview: "Overview",
      nav_ministries: "Ministries",
      nav_admins: "Admins",
      nav_reports: "Reports",
      nav_settings: "Settings",
      nav_logout: "Logout",
      nav_ministry_page: "Ministry Page",
      login_title: "Admin Login",
      login_desc: "Sign in with your username, password, and linked ministry.",
      username_label: "Username",
      username_placeholder: "Example: pm_admin",
      password_label: "Password",
      ministry_label: "Authority / Ministry / Work Domain",
      ministry_placeholder: "Select ministry",
      login_btn: "Login",
      register_btn: "Create Admin Account",
      back_home: "Back to Home",
      no_account: "Need a new admin account?",
      register_title: "Admin Registration",
      register_desc: "Create an administrative account linked to a specific authority.",
      full_name_label: "Full Name",
      full_name_placeholder: "Enter full name",
      email_label: "Email",
      email_placeholder: "name@example.com",
      phone_label: "Phone Number",
      phone_placeholder: "11 digits",
      national_id_label: "National ID",
      national_id_placeholder: "14 digits",
      custom_ministry_label: "New Ministry Name",
      custom_ministry_placeholder: "Type the ministry or authority name",
      confirm_password_label: "Confirm Password",
      create_account_btn: "Register Admin",
      back_to_admin_login: "Back to Admin Login",
      other_ministry_option: "Other Authority",
      overview_title: "Platform Overview",
      overview_subtitle_super: "The Prime Minister's Office governs the full platform and reviews ministries, requests, and administrators.",
      overview_subtitle_regular: "A dedicated operational space for your ministry, ready for future expansion.",
      stat_total_admins: "Total Admins",
      stat_active_ministries: "Approved Authorities",
      stat_pending_requests: "New Authority Requests",
      stat_total_reports: "Total Reports",
      quick_actions: "Quick Actions",
      action_open_ministries: "Manage Ministries",
      action_open_admins: "Manage Admins",
      action_open_reports: "Review Reports",
      action_open_own_page: "Open Ministry Page",
      action_open_portal: "Back to Portal",
      ministry_pages: "Core Ministry Pages",
      recent_activity: "Recent Activity",
      empty_activity: "No activity yet.",
      empty_reports: "No reports found yet.",
      empty_admins: "No admin accounts found.",
      empty_citizens: "No citizens registered yet.",
      empty_requests: "No pending ministry requests right now.",
      empty_ministries: "No ministries available.",
      admins_title: "Admin Account Management",
      admins_subtitle: "View all admins and connect them to the right authorities and permissions.",
      citizens_title: "Registered Citizens",
      reports_title: "Report Management",
      reports_subtitle: "Review current reports, update statuses, and inspect attachments.",
      settings_title: "Platform Settings",
      settings_subtitle: "Manage the current session and reset local data when needed.",
      ministries_title: "Ministry & Request Management",
      ministries_subtitle: "The Prime Minister's Office approves new authorities and supervises the platform structure.",
      pending_requests_title: "New Authority Requests",
      ministry_catalog_title: "Ministry Catalog",
      current_admin_title: "Current Account",
      local_storage_title: "Local Storage Management",
      reset_platform: "Reset Platform",
      logout_session: "Log Out Current Session",
      table_username: "Username",
      table_name: "Name",
      table_email: "Email",
      table_phone: "Phone",
      table_national_id: "National ID",
      table_ministry: "Ministry",
      table_role: "Role",
      table_status: "Status",
      table_type: "Type",
      table_created: "Created",
      table_actions: "Actions",
      table_description: "Description",
      table_request_type: "Request Type",
      table_category: "Category",
      table_location: "Location",
      table_date: "Date",
      table_photo: "Photo",
      table_id_card: "ID Card",
      table_id: "ID",
      table_sender: "Sender",
      status_active: "Active",
      status_pending: "Pending",
      status_rejected: "Rejected",
      status_approved: "Approved",
      role_super_admin: "Super Admin",
      role_ministry_admin: "Ministry Admin",
      type_core: "Core",
      type_custom: "Custom",
      view_photo: "View Photo",
      view_video: "View Video",
      view_id_card: "View ID Card",
      download_btn: "Download",
      approve_btn: "Approve",
      reject_btn: "Reject",
      rename_btn: "Rename",
      delete_btn: "Delete",
      open_page_btn: "Open Page",
      confirm_reset_platform: "This will clear local data and reseed the default authorities and accounts. Continue?",
      confirm_delete_admin: "Delete the selected admin account?",
      confirm_delete_ministry: "Delete this ministry? Related accounts will be rejected.",
      cannot_delete_core: "Core authorities cannot be deleted.",
      request_label: "New Request",
      requested_by_label: "Submitted By",
      no_ministry_access: "You do not have permission to access this page.",
      pending_notice: "The account or authority is still pending approval by the Prime Minister's Office.",
      rejected_notice: "The authority or account was rejected. Please contact the Prime Minister's Office.",
      invalid_credentials: "Invalid login credentials.",
      invalid_ministry: "The selected ministry does not match the linked account.",
      register_success_active: "Account created successfully. You can now sign in.",
      register_success_pending: "The request was submitted successfully and is now pending Prime Minister's Office approval.",
      rename_prompt: "Enter the new ministry name",
      ministry_dashboard_title: "Ministry Workspace",
      ministry_dashboard_subtitle: "A dedicated page for ministry-specific data, content, and future permissions.",
      assigned_admins: "Assigned Admins",
      ministry_metadata: "Ministry Metadata",
      ministry_permissions: "Current Permissions",
      no_assigned_admins: "No admins are currently linked to this ministry.",
      default_password_note: "Core accounts are available with the predefined startup passwords supplied for the project.",
      input_required: "Please complete all required fields.",
      weak_password: "Password must be at least 8 characters.",
      invalid_phone: "Phone number must be exactly 11 digits.",
      invalid_national_id: "National ID must be exactly 14 digits.",
      password_mismatch: "Passwords do not match.",
      username_exists: "Username already exists.",
      email_exists: "Email is already registered.",
      phone_exists: "Phone number is already registered.",
      national_id_exists: "National ID is already registered.",
      custom_ministry_required: "Enter the new authority name before continuing.",
      settings_summary: "The platform currently runs on Local Storage with a structure ready for future database integration.",
      account_ministry: "Current Ministry",
      account_role: "Current Role",
      account_status: "Account Status",
      total_citizens: "Total Citizens",
      ministry_request_status: "Request Status",
      seeded_account_badge: "Seeded",
      remove_action_blocked: "Default seeded accounts cannot be deleted.",
      click_to_close: "Click anywhere to close"
    }
  };

  var PAGE_TITLES = {
    login: { ar: "URSA · تسجيل دخول الأدمن", en: "URSA · Admin Login" },
    register: { ar: "URSA · تسجيل الأدمن", en: "URSA · Admin Registration" },
    home: { ar: "URSA · لوحة الإدارة", en: "URSA · Admin Overview" },
    ministries: { ar: "URSA · إدارة الجهات", en: "URSA · Ministries" },
    admins: { ar: "URSA · حسابات الأدمن", en: "URSA · Admin Accounts" },
    reports: { ar: "URSA · البلاغات", en: "URSA · Reports" },
    settings: { ar: "URSA · الإعدادات", en: "URSA · Settings" },
    ministry: { ar: "URSA · صفحة الجهة", en: "URSA · Ministry Page" }
  };

  function lang() {
    return platform.getLanguage();
  }

  function t(key) {
    return TRANSLATIONS[lang()][key] || key;
  }

  function formatDate(value) {
    if (!value) {
      return "-";
    }
    try {
      return new Date(value).toLocaleString(lang() === "ar" ? "ar-EG" : "en-US");
    } catch (error) {
      return value;
    }
  }

  function escapeHtml(value) {
    return platform.escapeHtml(value);
  }

  function applyTheme(mode) {
    if (mode === "light") {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
    localStorage.setItem(platform.STORAGE_KEYS.theme, mode);
  }

  function getStatusLabel(status) {
    if (status === "approved") {
      return t("status_approved");
    }
    if (status === "active") {
      return t("status_active");
    }
    if (status === "rejected") {
      return t("status_rejected");
    }
    return t("status_pending");
  }

  function getRoleLabel(role) {
    return role === "super_admin" ? t("role_super_admin") : t("role_ministry_admin");
  }

  function getTypeLabel(type) {
    return type === "core" ? t("type_core") : t("type_custom");
  }

  function getRequestTypeLabel(type) {
    return type === "message"
      ? (lang() === "ar" ? "رسالة" : "Message")
      : (lang() === "ar" ? "شكوى" : "Complaint");
  }

  function renderAttachmentActions(attachments) {
    var items = Array.isArray(attachments) ? attachments : [];
    if (!items.length) {
      return "-";
    }

    return items.map(function (attachment) {
      var isVideo = attachment.kind === "video";
      var label = isVideo ? t("view_video") : t("view_photo");
      return (
        '<div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">' +
          '<button class="action-btn" data-action="view-attachment" data-attachment-id="' + escapeHtml(attachment.id) + '">' + escapeHtml(label) + "</button>" +
          '<button class="action-btn" data-action="download-attachment" data-attachment-id="' + escapeHtml(attachment.id) + '">' + escapeHtml(t("download_btn")) + "</button>" +
        "</div>"
      );
    }).join("");
  }

  function getPageFile() {
    return window.location.pathname.split("/").pop();
  }

  function getPageTitleKey() {
    if (VIEW === "login" || VIEW === "register") {
      return VIEW;
    }
    if (VIEW === "ministries") {
      return "ministries";
    }
    if (VIEW === "admins") {
      return "admins";
    }
    if (VIEW === "reports") {
      return "reports";
    }
    if (VIEW === "settings") {
      return "settings";
    }
    if (VIEW === "ministry") {
      return "ministry";
    }
    return "home";
  }

  function setDocumentTitle() {
    var titleEntry = PAGE_TITLES[getPageTitleKey()];
    if (titleEntry) {
      document.title = titleEntry[lang()];
    }
  }

  function updateSelectOptions() {
    document.querySelectorAll("[data-ministry-select]").forEach(function (select) {
      var includeOther = select.getAttribute("data-include-other") === "true";
      var currentValue = select.value;
      var options = [
        '<option value="">' + escapeHtml(t("ministry_placeholder")) + "</option>"
      ];

      platform.getApprovedMinistries().forEach(function (ministry) {
        options.push(
          '<option value="' + escapeHtml(ministry.id) + '">' +
            escapeHtml(platform.getMinistryDisplayName(ministry, lang())) +
          "</option>"
        );
      });

      if (includeOther) {
        options.push(
          '<option value="other">' + escapeHtml(t("other_ministry_option")) + "</option>"
        );
      }

      select.innerHTML = options.join("");
      if (currentValue) {
        select.value = currentValue;
      }
    });
  }

  function showMessage(elementId, message, type) {
    var element = document.getElementById(elementId);
    if (!element) {
      return;
    }
    element.textContent = message;
    element.className = type === "success" ? "success-message" : "error-message";
    element.style.display = "block";
  }

  function clearMessage(elementId) {
    var element = document.getElementById(elementId);
    if (!element) {
      return;
    }
    element.textContent = "";
    element.style.display = "none";
  }

  function applyLanguage() {
    platform.applyTranslations(TRANSLATIONS);
    setDocumentTitle();
    updateSelectOptions();
    var customField = document.getElementById("customMinistryWrapper");
    var select = document.getElementById("adminMinistry");
    if (customField && select) {
      customField.style.display = select.value === "other" ? "block" : "none";
    }
    renderCurrentView();
  }

  function toggleLanguage() {
    platform.toggleLanguage();
    applyLanguage();
  }

  function openSidebar() {
    document.getElementById("sidebar") && document.getElementById("sidebar").classList.add("open");
    document.getElementById("overlay") && document.getElementById("overlay").classList.add("show");
  }

  function closeSidebar() {
    document.getElementById("sidebar") && document.getElementById("sidebar").classList.remove("open");
    document.getElementById("overlay") && document.getElementById("overlay").classList.remove("show");
  }

  function adminLogout() {
    platform.clearAdminSession();
    window.location.href = "admin-login.html";
  }

  function buildSidebarLinks(admin) {
    var items = [
      {
        href: "admin-home.html",
        icon: "fa-chart-line",
        label: t("nav_overview")
      }
    ];

    if (platform.isSuperAdmin(admin)) {
      items.push({
        href: "admin-ministries.html",
        icon: "fa-building-columns",
        label: t("nav_ministries")
      });
      items.push({
        href: "admin-users.html",
        icon: "fa-user-shield",
        label: t("nav_admins")
      });
    } else {
      items.push({
        href: platform.getHomeRouteForAdmin(admin),
        icon: "fa-building",
        label: t("nav_ministry_page")
      });
    }

    items.push({
      href: "admin-reports.html",
      icon: "fa-list",
      label: t("nav_reports")
    });
    items.push({
      href: "admin-settings.html",
      icon: "fa-gear",
      label: t("nav_settings")
    });

    return items
      .map(function (item) {
        var active = getPageFile() === item.href ? "active-nav" : "";
        return (
          '<li><a class="' + active + '" href="' + item.href + '">' +
            '<i class="fas ' + item.icon + '"></i> ' +
            escapeHtml(item.label) +
          "</a></li>"
        );
      })
      .join("");
  }

  function injectAdminLayout(admin) {
    if (document.getElementById("adminShell")) {
      return;
    }

    var ministry = platform.getMinistryById(admin.ministryId);
    var ministryName = platform.getMinistryDisplayName(ministry, lang());
    var html =
      '<div id="adminShell">' +
        '<div class="overlay" id="overlay"></div>' +
        '<aside class="sidebar" id="sidebar">' +
          '<div class="close-btn" id="closeSidebar">&times;</div>' +
          "<ul>" + buildSidebarLinks(admin) + "</ul>" +
          '<div class="glass-card" style="margin-top:24px; border-radius:24px; padding:18px;">' +
            '<div style="font-weight:700; margin-bottom:8px;">' + escapeHtml(admin.fullName) + "</div>" +
            '<div style="color:var(--text-secondary); font-size:0.95rem;">' + escapeHtml(ministryName) + "</div>" +
            '<div style="margin-top:10px; color:var(--primary); font-size:0.9rem;">' + escapeHtml(getRoleLabel(admin.role)) + "</div>" +
          "</div>" +
        "</aside>" +
      "</div>";

    document.body.insertAdjacentHTML("afterbegin", html);

    var topBar =
      '<div class="top-bar" id="adminTopBar">' +
        '<div class="logo-area">' +
          '<div class="hamburger" id="openSidebar"><i class="fas fa-bars"></i></div>' +
          '<div class="logo-container">' +
            '<div class="logo-image"><img src="URSA 3.png" alt="URSA Logo" /></div>' +
            '<div>' +
              '<div class="logo" data-i18n="brand_admin">' + escapeHtml(t("brand_admin")) + "</div>" +
              '<div style="color:var(--text-secondary); font-size:0.95rem;">' + escapeHtml(ministryName) + "</div>" +
            "</div>" +
          "</div>" +
        "</div>" +
        '<div style="display:flex; gap:12px; align-items:center;">' +
          '<button id="langToggle" class="glass-btn small" data-i18n="lang_btn">' + escapeHtml(t("lang_btn")) + "</button>" +
          '<div class="theme-toggle">' +
            '<i class="fas fa-sun" id="lightModeBtn"></i>' +
            '<i class="fas fa-moon active" id="darkModeBtn"></i>' +
          "</div>" +
          '<button id="adminLogoutLink" class="glass-btn small"><i class="fas fa-sign-out-alt"></i> ' + escapeHtml(t("nav_logout")) + "</button>" +
        "</div>" +
      "</div>";

    var container = document.querySelector(".container");
    if (container) {
      container.insertAdjacentHTML("beforebegin", topBar);
    }
  }

  function openAttachmentsDb() {
    return new Promise(function (resolve, reject) {
      var request = indexedDB.open(ATTACHMENTS_DB_NAME, 1);
      request.onupgradeneeded = function (event) {
        var db = event.target.result;
        if (!db.objectStoreNames.contains(ATTACHMENTS_STORE_NAME)) {
          db.createObjectStore(ATTACHMENTS_STORE_NAME, { keyPath: "id" });
        }
      };
      request.onsuccess = function () {
        resolve(request.result);
      };
      request.onerror = function () {
        reject(request.error || new Error("Failed to open IndexedDB"));
      };
    });
  }

  function getAttachmentRecord(attachmentId) {
    return openAttachmentsDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var transaction = db.transaction(ATTACHMENTS_STORE_NAME, "readonly");
        var request = transaction.objectStore(ATTACHMENTS_STORE_NAME).get(attachmentId);
        request.onsuccess = function () {
          db.close();
          resolve(request.result || null);
        };
        request.onerror = function () {
          db.close();
          reject(request.error || new Error("Failed to load attachment"));
        };
      });
    });
  }

  function triggerAttachmentDownload(record) {
    if (!record || !record.blob) {
      return;
    }
    var downloadUrl = URL.createObjectURL(record.blob);
    var link = document.createElement("a");
    link.href = downloadUrl;
    link.download = record.fileName || (record.kind === "video" ? "attachment-video" : "attachment-image");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(function () {
      URL.revokeObjectURL(downloadUrl);
    }, 1000);
  }

  function showAttachmentModal(record) {
    if (!record || !record.blob) {
      return;
    }
    var modal = document.createElement("div");
    modal.className = "overlay show";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "3000";
    modal.onclick = function () {
      modal.remove();
    };

    var mediaUrl = URL.createObjectURL(record.blob);
    var media;
    if (record.kind === "video") {
      media = document.createElement("video");
      media.controls = true;
      media.src = mediaUrl;
    } else {
      media = document.createElement("img");
      media.src = mediaUrl;
    }
    media.style.maxWidth = "90%";
    media.style.maxHeight = "90%";
    media.style.borderRadius = "20px";
    media.style.boxShadow = "0 0 50px rgba(0,0,0,0.8)";
    media.style.border = "2px solid var(--primary)";

    var hint = document.createElement("div");
    hint.textContent = t("click_to_close");
    hint.style.position = "absolute";
    hint.style.bottom = "20px";
    hint.style.background = "rgba(0,0,0,0.55)";
    hint.style.color = "#ffffff";
    hint.style.padding = "8px 18px";
    hint.style.borderRadius = "20px";

    var downloadBtn = document.createElement("button");
    downloadBtn.className = "glass-btn small";
    downloadBtn.textContent = t("download_btn");
    downloadBtn.style.position = "absolute";
    downloadBtn.style.top = "20px";
    downloadBtn.style.right = "20px";
    downloadBtn.onclick = function (event) {
      event.stopPropagation();
      triggerAttachmentDownload(record);
    };

    modal.appendChild(media);
    modal.appendChild(hint);
    modal.appendChild(downloadBtn);
    document.body.appendChild(modal);
    modal.addEventListener("click", function () {
      URL.revokeObjectURL(mediaUrl);
    }, { once: true });
  }

  function renderRecentActivity() {
    var container = document.getElementById("recentActivity");
    if (!container) {
      return;
    }

    var entries = platform.getAuditLog().slice().reverse().slice(0, 12);
    if (!entries.length) {
      container.innerHTML = '<div class="empty-state">' + escapeHtml(t("empty_activity")) + "</div>";
      return;
    }

    container.innerHTML = entries
      .map(function (entry) {
        return (
          '<div class="profile-chip" style="margin:8px 0;">' +
            '<i class="fas fa-circle-info"></i> ' +
            escapeHtml(entry.message || entry.type) +
            " · " +
            escapeHtml(formatDate(entry.ts)) +
          "</div>"
        );
      })
      .join("");
  }

  function renderHomePage(admin) {
    var overviewStats = document.getElementById("overviewStats");
    var quickActions = document.getElementById("quickActions");
    var ministryGrid = document.getElementById("ministryGrid");
    var pageTitle = document.getElementById("pageTitle");
    var pageSubtitle = document.getElementById("pageSubtitle");
    var reports = platform.getReports();
    var admins = platform.getAdminAccounts();
    var ministries = platform.getMinistries();
    var pendingRequests = platform.getMinistryRequests().filter(function (item) {
      return item.status === "pending";
    });

    if (pageTitle) {
      pageTitle.textContent = t("overview_title");
    }
    if (pageSubtitle) {
      pageSubtitle.textContent = platform.isSuperAdmin(admin) ? t("overview_subtitle_super") : t("overview_subtitle_regular");
    }

    if (overviewStats) {
      overviewStats.innerHTML =
        '<div class="dash-grid">' +
          statCard("fa-user-shield", admins.length, t("stat_total_admins")) +
          statCard("fa-building-columns", ministries.filter(function (item) { return item.status === "approved"; }).length, t("stat_active_ministries")) +
          statCard("fa-hourglass-half", pendingRequests.length, t("stat_pending_requests")) +
          statCard("fa-list", reports.length, t("stat_total_reports")) +
        "</div>";
    }

    if (quickActions) {
      var actions = [];
      if (platform.isSuperAdmin(admin)) {
        actions.push(buttonLink("admin-ministries.html", "fa-building-columns", t("action_open_ministries")));
        actions.push(buttonLink("admin-users.html", "fa-user-shield", t("action_open_admins")));
      } else {
        actions.push(buttonLink(platform.getHomeRouteForAdmin(admin), "fa-building", t("action_open_own_page")));
      }
      actions.push(buttonLink("admin-reports.html", "fa-list", t("action_open_reports")));
      actions.push(buttonLink("index.html", "fa-arrow-up-right-from-square", t("action_open_portal"), false));

      quickActions.innerHTML =
        '<div class="glass-card"><h2 style="margin-bottom:16px;"><i class="fas fa-bolt"></i> ' + escapeHtml(t("quick_actions")) + "</h2>" +
        '<div style="display:flex; gap:12px; flex-wrap:wrap;">' + actions.join("") + "</div></div>";
    }

    if (ministryGrid) {
      var visibleMinistries = platform.isSuperAdmin(admin)
        ? platform.CORE_MINISTRIES.map(function (item) { return platform.getMinistryById(item.id); }).filter(Boolean)
        : [platform.getMinistryById(admin.ministryId)];

      ministryGrid.innerHTML =
        '<div class="glass-card"><h2 style="margin-bottom:16px;"><i class="fas fa-building"></i> ' + escapeHtml(t("ministry_pages")) + "</h2>" +
        '<div class="dash-grid">' +
        visibleMinistries.map(function (ministry) {
          return (
            '<div class="glass-card">' +
              '<h3 style="margin-bottom:10px;">' + escapeHtml(platform.getMinistryDisplayName(ministry, lang())) + "</h3>" +
              '<p style="color:var(--text-secondary); margin-bottom:12px;">' + escapeHtml(getStatusLabel(ministry.status)) + "</p>" +
              buttonLink(platform.MINISTRY_ROUTES[ministry.id] || "admin-home.html", "fa-arrow-right", t("open_page_btn")) +
            "</div>"
          );
        }).join("") +
        "</div></div>";
    }

    renderRecentActivity();
  }

  function renderAdminsPage(admin) {
    var container = document.getElementById("adminAccountsList");
    var citizensContainer = document.getElementById("citizenUsersList");
    var title = document.getElementById("pageTitle");
    var subtitle = document.getElementById("pageSubtitle");
    var admins = platform.getAdminAccounts();
    var citizens = platform.getCitizens();

    if (title) {
      title.textContent = t("admins_title");
    }
    if (subtitle) {
      subtitle.textContent = t("admins_subtitle");
    }

    if (container) {
      if (!admins.length) {
        container.innerHTML = '<div class="empty-state">' + escapeHtml(t("empty_admins")) + "</div>";
      } else {
        container.innerHTML =
          '<table><thead><tr>' +
            th("table_username") + th("table_name") + th("table_ministry") + th("table_role") +
            th("table_status") + th("table_created") + th("table_actions") +
          '</tr></thead><tbody>' +
          admins.map(function (item) {
            var ministry = platform.getMinistryById(item.ministryId);
            return (
              "<tr>" +
                td(item.username) +
                td(item.fullName + (item.isSeeded ? " • " + t("seeded_account_badge") : "")) +
                td(platform.getMinistryDisplayName(ministry, lang()) || item.requestedMinistryName || "-") +
                td(getRoleLabel(item.role)) +
                td(getStatusLabel(item.status)) +
                td(formatDate(item.createdAt)) +
                '<td>' +
                  (item.isSeeded
                    ? '<span style="color:var(--text-secondary);">' + escapeHtml(t("remove_action_blocked")) + "</span>"
                    : '<button class="action-btn delete-btn" data-action="delete-admin" data-account-id="' + escapeHtml(item.id) + '">' + escapeHtml(t("delete_btn")) + "</button>") +
                "</td>" +
              "</tr>"
            );
          }).join("") +
          "</tbody></table>";
      }
    }

    if (citizensContainer) {
      if (!citizens.length) {
        citizensContainer.innerHTML = '<div class="empty-state">' + escapeHtml(t("empty_citizens")) + "</div>";
      } else {
        citizensContainer.innerHTML =
          '<table><thead><tr>' +
            th("table_name") + th("table_national_id") + th("table_phone") + th("table_id_card") +
          '</tr></thead><tbody>' +
          citizens.map(function (item) {
            return (
              "<tr>" +
                td(item.fullName) +
                td(item.nationalId) +
                td(item.phone) +
                '<td>' +
                  (item.idCardImage
                    ? '<button class="action-btn" data-action="view-image" data-image="' + escapeHtml(item.idCardImage) + '">' + escapeHtml(t("view_id_card")) + "</button>"
                    : "-") +
                "</td>" +
              "</tr>"
            );
          }).join("") +
          "</tbody></table>";
      }
    }
  }

  function renderReportsPage(admin) {
    var title = document.getElementById("pageTitle");
    var subtitle = document.getElementById("pageSubtitle");
    var container = document.getElementById("reportsList");
    var reports = platform.getReports().filter(function (report) {
      return platform.isSuperAdmin(admin) || report.ministryId === admin.ministryId;
    }).slice().reverse();

    if (title) {
      title.textContent = t("reports_title");
    }
    if (subtitle) {
      subtitle.textContent = t("reports_subtitle");
    }

    if (!container) {
      return;
    }

    if (!reports.length) {
      container.innerHTML = '<div class="empty-state">' + escapeHtml(t("empty_reports")) + "</div>";
      return;
    }

    container.innerHTML =
      '<table><thead><tr>' +
        th("table_id") + th("table_request_type") + th("table_ministry") + th("table_sender") +
        th("table_category") + th("table_description") + th("table_location") +
        th("table_status") + th("table_date") + th("table_photo") +
      '</tr></thead><tbody>' +
      reports.map(function (report) {
        var ministry = platform.getMinistryById(report.ministryId);
        return (
          "<tr>" +
            td(report.id) +
            td(getRequestTypeLabel(report.type)) +
            td((ministry && platform.getMinistryDisplayName(ministry, lang())) || report.ministryName || "-") +
            td(report.userFullName || report.userNationalId || "-") +
            td(report.category || "-") +
            td(report.description || "-") +
            td(report.location || "-") +
            "<td>" +
              '<select class="action-btn status-select" data-action="update-report-status" data-report-id="' + escapeHtml(report.id) + '" style="background: rgba(77, 255, 158, 0.1); border: 1px solid rgba(77, 255, 158, 0.2); color: var(--text-primary); cursor: pointer; outline: none;">' +
                '<option value="pending"' + (report.status === "pending" ? " selected" : "") + ">" + escapeHtml(t("status_pending")) + "</option>" +
                '<option value="approved"' + (report.status === "approved" ? " selected" : "") + ">" + escapeHtml(t("status_approved")) + "</option>" +
              "</select>" +
            "</td>" +
            td(formatDate(report.createdAt || report.date)) +
            "<td>" + renderAttachmentActions(report.attachments) + "</td>" +
          "</tr>"
        );
      }).join("") +
      "</tbody></table>";
  }

  function renderSettingsPage(admin) {
    var title = document.getElementById("pageTitle");
    var subtitle = document.getElementById("pageSubtitle");
    var accountBox = document.getElementById("accountSettingsCard");
    var storageBox = document.getElementById("storageSettingsCard");
    var ministry = platform.getMinistryById(admin.ministryId);

    if (title) {
      title.textContent = t("settings_title");
    }
    if (subtitle) {
      subtitle.textContent = t("settings_subtitle");
    }

    if (accountBox) {
      accountBox.innerHTML =
        '<div class="glass-card">' +
          '<h2 style="margin-bottom:16px;"><i class="fas fa-id-badge"></i> ' + escapeHtml(t("current_admin_title")) + "</h2>" +
          profileLine(t("table_name"), admin.fullName) +
          profileLine(t("table_username"), admin.username) +
          profileLine(t("account_ministry"), platform.getMinistryDisplayName(ministry, lang())) +
          profileLine(t("account_role"), getRoleLabel(admin.role)) +
          profileLine(t("account_status"), getStatusLabel(admin.status)) +
          '<p style="margin-top:16px; color:var(--text-secondary);">' + escapeHtml(t("settings_summary")) + "</p>" +
        "</div>";
    }

    if (storageBox) {
      storageBox.innerHTML =
        '<div class="glass-card">' +
          '<h2 style="margin-bottom:16px;"><i class="fas fa-database"></i> ' + escapeHtml(t("local_storage_title")) + "</h2>" +
          profileLine(t("stat_total_admins"), String(platform.getAdminAccounts().length)) +
          profileLine(t("total_citizens"), String(platform.getCitizens().length)) +
          profileLine(t("stat_total_reports"), String(platform.getReports().length)) +
          '<div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:16px;">' +
            (platform.isSuperAdmin(admin)
              ? '<button class="glass-btn" data-action="reset-platform" style="color:var(--danger); border-color:var(--danger);">' + escapeHtml(t("reset_platform")) + "</button>"
              : "") +
            '<button class="glass-btn" data-action="logout-session">' + escapeHtml(t("logout_session")) + "</button>" +
          "</div>" +
        "</div>";
    }
  }

  function renderMinistriesPage() {
    var title = document.getElementById("pageTitle");
    var subtitle = document.getElementById("pageSubtitle");
    var requestsContainer = document.getElementById("ministryRequestsList");
    var ministriesContainer = document.getElementById("ministriesCatalogList");
    var requests = platform.getMinistryRequests().slice().reverse();
    var ministries = platform.getMinistries().slice();
    var admins = platform.getAdminAccounts();

    if (title) {
      title.textContent = t("ministries_title");
    }
    if (subtitle) {
      subtitle.textContent = t("ministries_subtitle");
    }

    if (requestsContainer) {
      var pending = requests.filter(function (item) { return item.status === "pending"; });
      if (!pending.length) {
        requestsContainer.innerHTML = '<div class="empty-state">' + escapeHtml(t("empty_requests")) + "</div>";
      } else {
        requestsContainer.innerHTML = pending.map(function (request) {
          var ministry = platform.getMinistryById(request.ministryId);
          var requester = admins.find(function (item) {
            return item.id === request.requestedByAccountId;
          });
          return (
            '<div class="glass-card" style="margin-bottom:16px;">' +
              '<h3 style="margin-bottom:8px;"><i class="fas fa-hourglass-half"></i> ' + escapeHtml(request.requestedName) + "</h3>" +
              '<p style="color:var(--text-secondary); margin-bottom:6px;">' + escapeHtml(t("requested_by_label")) + ": " + escapeHtml(requester ? requester.fullName : "-") + "</p>" +
              '<p style="color:var(--text-secondary); margin-bottom:14px;">' + escapeHtml(formatDate(request.submittedAt)) + "</p>" +
              '<div style="display:flex; gap:10px; flex-wrap:wrap;">' +
                '<button class="glass-btn primary" data-action="approve-request" data-request-id="' + escapeHtml(request.id) + '">' + escapeHtml(t("approve_btn")) + "</button>" +
                '<button class="glass-btn" data-action="reject-request" data-request-id="' + escapeHtml(request.id) + '">' + escapeHtml(t("reject_btn")) + "</button>" +
                (ministry ? '<button class="glass-btn" data-action="rename-ministry" data-ministry-id="' + escapeHtml(ministry.id) + '">' + escapeHtml(t("rename_btn")) + "</button>" : "") +
              "</div>" +
            "</div>"
          );
        }).join("");
      }
    }

    if (ministriesContainer) {
      if (!ministries.length) {
        ministriesContainer.innerHTML = '<div class="empty-state">' + escapeHtml(t("empty_ministries")) + "</div>";
      } else {
        ministriesContainer.innerHTML =
          '<table><thead><tr>' +
            th("table_name") + th("table_type") + th("table_status") + th("table_created") + th("table_actions") +
          '</tr></thead><tbody>' +
          ministries.map(function (ministry) {
            return (
              "<tr>" +
                td(platform.getMinistryDisplayName(ministry, lang())) +
                td(getTypeLabel(ministry.type)) +
                td(getStatusLabel(ministry.status)) +
                td(formatDate(ministry.createdAt || ministry.approvedAt)) +
                '<td>' +
                  '<button class="action-btn" data-action="rename-ministry" data-ministry-id="' + escapeHtml(ministry.id) + '">' + escapeHtml(t("rename_btn")) + "</button> " +
                  (platform.MINISTRY_ROUTES[ministry.id]
                    ? '<a class="action-btn" style="text-decoration:none;" href="' + platform.MINISTRY_ROUTES[ministry.id] + '">' + escapeHtml(t("open_page_btn")) + "</a> "
                    : "") +
                  '<button class="action-btn delete-btn" data-action="delete-ministry" data-ministry-id="' + escapeHtml(ministry.id) + '">' + escapeHtml(t("delete_btn")) + "</button>" +
                "</td>" +
              "</tr>"
            );
          }).join("") +
          "</tbody></table>";
      }
    }
  }

  function renderMinistryPage(admin) {
    var ministryId = document.body.dataset.ministryId;
    var ministry = platform.getMinistryById(ministryId);
    var title = document.getElementById("pageTitle");
    var subtitle = document.getElementById("pageSubtitle");
    var metadata = document.getElementById("ministryMeta");
    var adminsBox = document.getElementById("ministryAdmins");
    var actionsBox = document.getElementById("ministryActions");

    if (!ministry) {
      return;
    }

    if (!platform.isSuperAdmin(admin) && admin.ministryId !== ministry.id) {
      window.location.href = platform.getHomeRouteForAdmin(admin);
      return;
    }

    if (title) {
      title.textContent = platform.getMinistryDisplayName(ministry, lang());
    }
    if (subtitle) {
      subtitle.textContent = t("ministry_dashboard_subtitle");
    }

    if (metadata) {
      metadata.innerHTML =
        '<div class="glass-card">' +
          '<h2 style="margin-bottom:16px;"><i class="fas fa-circle-info"></i> ' + escapeHtml(t("ministry_metadata")) + "</h2>" +
          profileLine(t("table_name"), platform.getMinistryDisplayName(ministry, lang())) +
          profileLine(t("table_type"), getTypeLabel(ministry.type)) +
          profileLine(t("table_status"), getStatusLabel(ministry.status)) +
          profileLine(t("table_created"), formatDate(ministry.createdAt || ministry.approvedAt)) +
          profileLine(t("ministry_permissions"), (ministry.permissions || []).join(", ")) +
        "</div>";
    }

    if (adminsBox) {
      var linkedAdmins = platform.getAdminAccounts().filter(function (item) {
        return item.ministryId === ministry.id;
      });
      adminsBox.innerHTML =
        '<div class="glass-card"><h2 style="margin-bottom:16px;"><i class="fas fa-user-shield"></i> ' + escapeHtml(t("assigned_admins")) + "</h2>" +
        (linkedAdmins.length
          ? linkedAdmins.map(function (item) {
              return '<div class="profile-chip" style="margin:8px 0;">' + escapeHtml(item.fullName + " · " + item.username + " · " + getStatusLabel(item.status)) + "</div>";
            }).join("")
          : '<div class="empty-state">' + escapeHtml(t("no_assigned_admins")) + "</div>") +
        "</div>";
    }

    if (actionsBox) {
      actionsBox.innerHTML =
        '<div class="glass-card"><h2 style="margin-bottom:16px;"><i class="fas fa-link"></i> ' + escapeHtml(t("quick_actions")) + "</h2>" +
        '<div style="display:flex; gap:12px; flex-wrap:wrap;">' +
          buttonLink("admin-reports.html", "fa-list", t("action_open_reports")) +
          (platform.isSuperAdmin(admin) ? buttonLink("admin-ministries.html", "fa-building-columns", t("action_open_ministries")) : "") +
        "</div></div>";
    }
  }

  function statCard(icon, value, label) {
    return (
      '<div class="glass-card">' +
        '<div style="font-size:2.4rem; color:var(--primary);"><i class="fas ' + icon + '"></i></div>' +
        '<div style="font-size:2rem; font-weight:700; margin:10px 0;">' + escapeHtml(String(value)) + "</div>" +
        "<p>" + escapeHtml(label) + "</p>" +
      "</div>"
    );
  }

  function buttonLink(href, icon, label, primary) {
    var variant = primary === false ? "glass-btn" : "glass-btn primary";
    return '<a class="' + variant + '" href="' + href + '" style="text-decoration:none;"><i class="fas ' + icon + '"></i> ' + escapeHtml(label) + "</a>";
  }

  function profileLine(label, value) {
    return '<div style="margin:10px 0;"><strong>' + escapeHtml(label) + ':</strong> <span style="color:var(--text-secondary);">' + escapeHtml(value || "-") + "</span></div>";
  }

  function th(key) {
    return "<th>" + escapeHtml(t(key)) + "</th>";
  }

  function td(value) {
    return "<td>" + escapeHtml(value == null ? "-" : String(value)) + "</td>";
  }

  function renderCurrentView() {
    if (VIEW === "login" || VIEW === "register") {
      return;
    }

    var admin = platform.getCurrentAdmin();
    if (!admin) {
      return;
    }

    if (VIEW === "admins") {
      renderAdminsPage(admin);
      return;
    }

    if (VIEW === "reports") {
      renderReportsPage(admin);
      return;
    }

    if (VIEW === "settings") {
      renderSettingsPage(admin);
      return;
    }

    if (VIEW === "ministries") {
      renderMinistriesPage(admin);
      return;
    }

    if (VIEW === "ministry") {
      renderMinistryPage(admin);
      return;
    }

    renderHomePage(admin);
  }

  function handleLoginSubmit(event) {
    event.preventDefault();
    clearMessage("authError");
    var result = platform.authenticateAdmin({
      username: document.getElementById("adminUsername").value,
      password: document.getElementById("adminPassword").value,
      ministryId: document.getElementById("adminLoginMinistry").value
    });

    if (!result.ok) {
      var key = result.code === "invalid_ministry" ? "invalid_ministry" : result.code === "account_pending" || result.code === "ministry_pending" ? "pending_notice" : result.code === "account_rejected" ? "rejected_notice" : "invalid_credentials";
      showMessage("authError", t(key), "error");
      return;
    }

    window.location.href = platform.getHomeRouteForAdmin(result.account);
  }

  function handleRegisterSubmit(event) {
    event.preventDefault();
    clearMessage("authError");
    clearMessage("authSuccess");

    var password = document.getElementById("adminRegisterPassword").value;
    var confirmPassword = document.getElementById("adminRegisterConfirmPassword").value;
    if (password !== confirmPassword) {
      showMessage("authError", t("password_mismatch"), "error");
      return;
    }

    var result = platform.registerAdmin({
      fullName: document.getElementById("adminFullName").value.trim(),
      username: document.getElementById("adminRegisterUsername").value.trim(),
      email: document.getElementById("adminEmail").value.trim(),
      phone: document.getElementById("adminPhone").value.trim(),
      nationalId: document.getElementById("adminNationalId").value.trim(),
      ministryId: document.getElementById("adminMinistry").value,
      customMinistryName: document.getElementById("adminCustomMinistry").value.trim(),
      password: password
    });

    if (!result.ok) {
      showMessage("authError", t(result.code) || t("input_required"), "error");
      return;
    }

    showMessage("authSuccess", result.pendingApproval ? t("register_success_pending") : t("register_success_active"), "success");
    document.getElementById("adminRegisterForm").reset();
    updateSelectOptions();
    var wrapper = document.getElementById("customMinistryWrapper");
    if (wrapper) {
      wrapper.style.display = "none";
    }
  }

  function bindAuthPage() {
    var loginForm = document.getElementById("adminLoginForm");
    var registerForm = document.getElementById("adminRegisterForm");
    var langBtn = document.getElementById("langToggle");

    if (langBtn) {
      langBtn.addEventListener("click", toggleLanguage);
    }

    if (loginForm) {
      loginForm.addEventListener("submit", handleLoginSubmit);
    }

    if (registerForm) {
      registerForm.addEventListener("submit", handleRegisterSubmit);
    }

    var ministrySelect = document.getElementById("adminMinistry");
    if (ministrySelect) {
      ministrySelect.addEventListener("change", function () {
        var wrapper = document.getElementById("customMinistryWrapper");
        if (wrapper) {
          wrapper.style.display = ministrySelect.value === "other" ? "block" : "none";
        }
      });
    }
  }

  function guardAdminPage(admin) {
    if (VIEW === "ministries" || VIEW === "admins") {
      if (!platform.isSuperAdmin(admin)) {
        window.location.href = platform.getHomeRouteForAdmin(admin);
        return false;
      }
    }
    return true;
  }

  async function handleActionClick(event) {
    var button = event.target.closest("[data-action]");
    if (!button) {
      return;
    }

    var admin = platform.getCurrentAdmin();
    var action = button.getAttribute("data-action");

    if (action === "view-attachment" || action === "download-attachment") {
      var attachmentId = button.getAttribute("data-attachment-id");
      if (!attachmentId) {
        return;
      }
      try {
        var record = await getAttachmentRecord(attachmentId);
        if (!record) {
          return;
        }
        if (action === "view-attachment") {
          showAttachmentModal(record);
        } else {
          triggerAttachmentDownload(record);
        }
      } catch (error) {
        console.error("Attachment action failed:", error);
      }
      return;
    }

    if (action === "logout-session") {
      adminLogout();
      return;
    }

    if (action === "reset-platform") {
      if (confirm(t("confirm_reset_platform"))) {
        platform.resetPlatformData();
        window.location.href = "admin-login.html";
      }
      return;
    }

    if (!admin || !platform.isSuperAdmin(admin)) {
      alert(t("no_ministry_access"));
      return;
    }

    if (action === "approve-request") {
      platform.approveMinistryRequest(button.getAttribute("data-request-id"), admin);
      applyLanguage();
      return;
    }

    if (action === "reject-request") {
      platform.rejectMinistryRequest(button.getAttribute("data-request-id"), admin);
      applyLanguage();
      return;
    }

    if (action === "rename-ministry") {
      var ministryId = button.getAttribute("data-ministry-id");
      var nextName = window.prompt(t("rename_prompt"));
      if (nextName) {
        platform.renameMinistry(ministryId, nextName, admin);
        applyLanguage();
      }
      return;
    }

    if (action === "delete-ministry") {
      var deleteId = button.getAttribute("data-ministry-id");
      if (confirm(t("confirm_delete_ministry"))) {
        var result = platform.deleteMinistry(deleteId, admin);
        if (!result.ok && result.code === "cannot_delete_core") {
          alert(t("cannot_delete_core"));
        }
        applyLanguage();
      }
      return;
    }

    if (action === "delete-admin") {
      var accountId = button.getAttribute("data-account-id");
      if (confirm(t("confirm_delete_admin"))) {
        var deleteResult = platform.deleteAdminAccount(accountId, admin);
        if (!deleteResult.ok && deleteResult.code === "cannot_delete_seeded") {
          alert(t("remove_action_blocked"));
        }
        applyLanguage();
      }
    }
  }

  function handleStatusChange(event) {
    var select = event.target.closest("[data-action='update-report-status']");
    if (!select) {
      return;
    }

    var admin = platform.getCurrentAdmin();
    var reportId = select.getAttribute("data-report-id");
    var newStatus = select.value;

    if (platform.updateReportStatus(reportId, newStatus, admin)) {
      renderReportsPage(admin);
    } else {
      alert("Failed to update status.");
    }
  }

  function bindAdminLayoutEvents() {
    document.getElementById("openSidebar") && document.getElementById("openSidebar").addEventListener("click", openSidebar);
    document.getElementById("closeSidebar") && document.getElementById("closeSidebar").addEventListener("click", closeSidebar);
    document.getElementById("overlay") && document.getElementById("overlay").addEventListener("click", closeSidebar);
    document.getElementById("langToggle") && document.getElementById("langToggle").addEventListener("click", toggleLanguage);
    document.getElementById("adminLogoutLink") && document.getElementById("adminLogoutLink").addEventListener("click", adminLogout);
    document.getElementById("lightModeBtn") && document.getElementById("lightModeBtn").addEventListener("click", function () { applyTheme("light"); });
    document.getElementById("darkModeBtn") && document.getElementById("darkModeBtn").addEventListener("click", function () { applyTheme("dark"); });
    document.addEventListener("click", handleActionClick);
    document.addEventListener("change", handleStatusChange);
  }

  document.addEventListener("DOMContentLoaded", function () {
    platform.seedPlatformData();
    applyTheme(localStorage.getItem(platform.STORAGE_KEYS.theme) || "dark");

    if (VIEW === "login" || VIEW === "register") {
      bindAuthPage();
      applyLanguage();
      return;
    }

    var admin = platform.requireAdminAccess();
    if (!admin) {
      return;
    }

    if (!guardAdminPage(admin)) {
      return;
    }

    injectAdminLayout(admin);
    bindAdminLayoutEvents();
    applyLanguage();
  });
})();
