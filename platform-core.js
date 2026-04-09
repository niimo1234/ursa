(function (global) {
  "use strict";

  var STORAGE_KEYS = {
    citizens: "ursa_users",
    currentCitizen: "ursa_current_user",
    adminAccounts: "ursa_admin_accounts",
    ministries: "ursa_ministries",
    ministryRequests: "ursa_ministry_requests",
    complaints: "ursa_complaints",
    audit: "ursa_audit",
    theme: "ursa_theme",
    language: "ursa_lang",
    platformState: "ursa_admin_platform_state_v3"
  };

  var SESSION_KEYS = {
    admin: "ursa_admin_session_v2"
  };

  var PLATFORM_SCHEMA_VERSION = 3;
  var DEFAULT_MINISTRY_PERMISSIONS = ["dashboard:view", "reports:view", "ministry:view"];
  var SUPER_ADMIN_PERMISSIONS = [
    "platform:all",
    "dashboard:view",
    "reports:view",
    "ministry:view",
    "ministries:view",
    "ministries:approve",
    "ministries:rename",
    "ministries:delete",
    "admins:view_all",
    "admins:delete"
  ];

  var MINISTRY_ROUTES = {
    "prime-ministry": "admin-prime-ministry.html",
    education: "admin-education.html",
    youth: "admin-youth.html",
    interior: "admin-interior.html",
    communications: "admin-communications.html"
  };

  var CORE_MINISTRIES = [
    {
      id: "prime-ministry",
      code: "PMO",
      names: {
        ar: "رئاسة الوزراء",
        en: "Prime Minister's Office"
      },
      type: "core",
      status: "approved",
      isSuperAdmin: true,
      category: "government",
      audience: "all",
      permissions: SUPER_ADMIN_PERMISSIONS,
      pageSummary: {
        ar: "الجهة المركزية الأعلى في المنصة والمسؤولة عن اعتماد الجهات الجديدة ومتابعة كامل البنية الإدارية.",
        en: "The top governing authority of the platform, responsible for approving new authorities and supervising the full administrative structure."
      }
    },
    {
      id: "education",
      code: "EDU",
      names: {
        ar: "التربية والتعليم",
        en: "Education"
      },
      type: "core",
      status: "approved",
      category: "service",
      audience: "education",
      permissions: DEFAULT_MINISTRY_PERMISSIONS,
      pageSummary: {
        ar: "مساحة تشغيل خاصة بملفات التعليم والخدمات والبلاغات المرتبطة بالقطاع التعليمي.",
        en: "A dedicated workspace for education-related services, reports, and future operational modules."
      }
    },
    {
      id: "youth",
      code: "YTH",
      names: {
        ar: "الشباب والرياضة",
        en: "Youth and Sports"
      },
      type: "core",
      status: "approved",
      category: "service",
      audience: "sports",
      permissions: DEFAULT_MINISTRY_PERMISSIONS,
      pageSummary: {
        ar: "صفحة مستقلة لإدارة محتوى وبيانات قطاع الشباب والرياضة والتقارير المرتبطة به.",
        en: "An isolated page for youth and sports data, content, and future ministry-specific permissions."
      }
    },
    {
      id: "interior",
      code: "INT",
      names: {
        ar: "الداخلية",
        en: "Interior"
      },
      type: "core",
      status: "approved",
      category: "security",
      audience: "public-safety",
      permissions: DEFAULT_MINISTRY_PERMISSIONS,
      pageSummary: {
        ar: "واجهة مهيأة لعمليات الأمن الداخلي والبلاغات والمتابعات الميدانية داخل الجهة.",
        en: "A prepared workspace for internal security operations, reports, and field follow-up modules."
      }
    },
    {
      id: "communications",
      code: "COM",
      names: {
        ar: "الاتصالات",
        en: "Communications"
      },
      type: "core",
      status: "approved",
      category: "digital",
      audience: "technology",
      permissions: DEFAULT_MINISTRY_PERMISSIONS,
      pageSummary: {
        ar: "بيئة مخصصة لتتبع البيانات الرقمية، التقارير التقنية، والتكاملات المستقبلية.",
        en: "A dedicated environment for digital operations, technical reports, and future integrations."
      }
    }
  ];

  var DEFAULT_ADMINS = [
    {
      id: "admin-prime-ministry",
      username: "pm_admin",
      fullName: "Prime Minister's Office Administrator",
      email: "pm_admin@ursa.local",
      phone: "01000000001",
      nationalId: "29901010000001",
      ministryId: "prime-ministry",
      role: "super_admin",
      status: "active",
      passwordSalt: "URSA_PM_V2_2026",
      passwordHash: "6d81224e5caa0829afedd9620008df6462e27d51ab627a994c490f9171a92fa2",
      passwordVersion: "v2",
      isSeeded: true
    },
    {
      id: "admin-education",
      username: "edu_admin",
      fullName: "Education Administrator",
      email: "edu_admin@ursa.local",
      phone: "01000000002",
      nationalId: "29901010000002",
      ministryId: "education",
      role: "ministry_admin",
      status: "active",
      passwordSalt: "URSA_EDU_V2_2026",
      passwordHash: "795fb70a0c9e09fe5b51a7a3d57a4a1458e5602c1a75aa43dcb421508f477a8c",
      passwordVersion: "v2",
      isSeeded: true
    },
    {
      id: "admin-youth",
      username: "sport_admin",
      fullName: "Youth and Sports Administrator",
      email: "sport_admin@ursa.local",
      phone: "01000000003",
      nationalId: "29901010000003",
      ministryId: "youth",
      role: "ministry_admin",
      status: "active",
      passwordSalt: "URSA_SPORT_V2_2026",
      passwordHash: "316f3cb1ed3b4fce4083afb0cc08c301679b6767c43120847e54d492b19f515c",
      passwordVersion: "v2",
      isSeeded: true
    },
    {
      id: "admin-interior",
      username: "interior_admin",
      fullName: "Interior Administrator",
      email: "interior_admin@ursa.local",
      phone: "01000000004",
      nationalId: "29901010000004",
      ministryId: "interior",
      role: "ministry_admin",
      status: "active",
      passwordSalt: "URSA_INT_V2_2026",
      passwordHash: "757965ffbba8e864f83e78c204980103006a90de81108aa5f464e79b52b07319",
      passwordVersion: "v2",
      isSeeded: true
    },
    {
      id: "admin-communications",
      username: "comm_admin",
      fullName: "Communications Administrator",
      email: "comm_admin@ursa.local",
      phone: "01000000005",
      nationalId: "29901010000005",
      ministryId: "communications",
      role: "ministry_admin",
      status: "active",
      passwordSalt: "URSA_COM_V2_2026",
      passwordHash: "44fbce2df1a2b630caab5cd1542f1680112b28faba9c11c9980f41171306ea49",
      passwordVersion: "v2",
      isSeeded: true
    }
  ];

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function readJSON(key, fallbackValue) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : clone(fallbackValue);
    } catch (error) {
      return clone(fallbackValue);
    }
  }

  function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function createId(prefix) {
    return prefix + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
  }

  function normalizeText(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  function slugify(value) {
    return normalizeText(value)
      .replace(/[^\w\u0600-\u06FF -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function sha256(ascii) {
    function rightRotate(value, amount) {
      return (value >>> amount) | (value << (32 - amount));
    }

    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var words = [];
    var asciiBitLength = ascii.length * 8;
    var hash = [];
    var k = [];
    var primeCounter = 0;
    var isComposite = {};
    var candidate;
    var i;
    var j;
    var result = "";

    for (candidate = 2; primeCounter < 64; candidate += 1) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 313; i += candidate) {
          isComposite[i] = candidate;
        }
        hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
        primeCounter += 1;
      }
    }

    ascii += "\x80";
    while ((ascii.length % 64) !== 56) {
      ascii += "\x00";
    }

    for (i = 0; i < ascii.length; i += 1) {
      j = ascii.charCodeAt(i);
      words[i >> 2] |= j << ((3 - (i % 4)) * 8);
    }

    words[words.length] = (asciiBitLength / maxWord) | 0;
    words[words.length] = asciiBitLength;

    for (j = 0; j < words.length; ) {
      var w = words.slice(j, (j += 16));
      var oldHash = hash.slice(0);
      var a;
      var e;

      hash = oldHash.slice(0, 8);

      for (i = 0; i < 64; i += 1) {
        var w15 = w[i - 15];
        var w2 = w[i - 2];
        var sigma0;
        var sigma1;
        var temp1;
        var temp2;

        if (i >= 16) {
          sigma0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
          sigma1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
          w[i] = (w[i - 16] + sigma0 + w[i - 7] + sigma1) | 0;
        }

        a = hash[0];
        e = hash[4];
        temp1 =
          hash[7] +
          (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
          ((e & hash[5]) ^ (~e & hash[6])) +
          k[i] +
          w[i];
        temp2 =
          (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
          ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));

        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
        hash.pop();
      }

      for (i = 0; i < 8; i += 1) {
        hash[i] = (hash[i] + oldHash[i]) | 0;
      }
    }

    for (i = 0; i < 8; i += 1) {
      for (j = 3; j >= 0; j -= 1) {
        var b = (hash[i] >> (j * 8)) & 255;
        result += (b < 16 ? "0" : "") + b.toString(16);
      }
    }

    return result;
  }

  function hashPassword(password, salt) {
    return sha256((salt ? String(salt) + "::" : "") + String(password || ""));
  }

  function createPasswordRecord(password, salt) {
    var safeSalt = salt || createId("salt");
    return {
      passwordSalt: safeSalt,
      passwordHash: hashPassword(password, safeSalt),
      passwordVersion: "v2"
    };
  }

  function createEmptyPlatformState() {
    return {
      schemaVersion: PLATFORM_SCHEMA_VERSION,
      metadata: {
        createdAt: nowIso(),
        lastUpdatedAt: nowIso()
      },
      settings: {
        language: localStorage.getItem(STORAGE_KEYS.language) || "ar"
      },
      ministries: [],
      adminAccounts: [],
      ministryRequests: [],
      auditLog: []
    };
  }

  function normalizeMinistry(ministry) {
    if (!ministry) {
      return null;
    }
    var normalized = clone(ministry);
    normalized.names = normalized.names || {
      ar: normalized.displayName || normalized.id || "",
      en: normalized.displayName || normalized.id || ""
    };
    normalized.displayName = normalized.displayName || normalized.names.ar || normalized.names.en || normalized.id;
    normalized.type = normalized.type || "custom";
    normalized.status = normalized.status || "pending";
    normalized.permissions = Array.isArray(normalized.permissions) && normalized.permissions.length
      ? normalized.permissions
      : clone(normalized.isSuperAdmin ? SUPER_ADMIN_PERMISSIONS : DEFAULT_MINISTRY_PERMISSIONS);
    normalized.pageSummary = normalized.pageSummary || {
      ar: normalized.displayName,
      en: normalized.displayName
    };
    normalized.category = normalized.category || "general";
    normalized.audience = normalized.audience || "general";
    normalized.createdAt = normalized.createdAt || nowIso();
    normalized.updatedAt = normalized.updatedAt || null;
    normalized.isSuperAdmin = !!normalized.isSuperAdmin;
    return normalized;
  }

  function normalizeAdminAccount(account) {
    if (!account) {
      return null;
    }
    var normalized = clone(account);
    normalized.status = normalized.status || "active";
    normalized.role = normalized.role || "ministry_admin";
    normalized.createdAt = normalized.createdAt || nowIso();
    normalized.createdBy = normalized.createdBy || "system";
    normalized.isSeeded = !!normalized.isSeeded;
    normalized.passwordVersion = normalized.passwordVersion || (normalized.passwordSalt ? "v2" : "v1");
    normalized.passwordSalt = normalized.passwordSalt || null;
    return normalized;
  }

  function normalizeMinistryRequest(request) {
    if (!request) {
      return null;
    }
    var normalized = clone(request);
    normalized.status = normalized.status || "pending";
    normalized.submittedAt = normalized.submittedAt || nowIso();
    normalized.requestedByAccountId = normalized.requestedByAccountId || null;
    return normalized;
  }

  function normalizeAuditEntry(entry) {
    if (!entry) {
      return null;
    }
    var normalized = clone(entry);
    normalized.id = normalized.id || createId("audit");
    normalized.ts = normalized.ts || nowIso();
    normalized.payload = normalized.payload || normalized.extra || null;
    normalized.actorId = normalized.actorId || null;
    return normalized;
  }

  function normalizePlatformState(state) {
    var safeState = state && typeof state === "object" ? clone(state) : createEmptyPlatformState();
    safeState.schemaVersion = PLATFORM_SCHEMA_VERSION;
    safeState.metadata = safeState.metadata || {};
    safeState.metadata.createdAt = safeState.metadata.createdAt || nowIso();
    safeState.metadata.lastUpdatedAt = nowIso();
    safeState.settings = safeState.settings || {};
    safeState.settings.language = safeState.settings.language || (localStorage.getItem(STORAGE_KEYS.language) || "ar");
    safeState.ministries = (safeState.ministries || []).map(normalizeMinistry).filter(Boolean);
    safeState.adminAccounts = (safeState.adminAccounts || []).map(normalizeAdminAccount).filter(Boolean);
    safeState.ministryRequests = (safeState.ministryRequests || []).map(normalizeMinistryRequest).filter(Boolean);
    safeState.auditLog = (safeState.auditLog || []).map(normalizeAuditEntry).filter(Boolean);
    return safeState;
  }

  function savePlatformState(state) {
    var normalized = normalizePlatformState(state);
    writeJSON(STORAGE_KEYS.platformState, normalized);
    writeJSON(STORAGE_KEYS.ministries, normalized.ministries);
    writeJSON(STORAGE_KEYS.adminAccounts, normalized.adminAccounts);
    writeJSON(STORAGE_KEYS.ministryRequests, normalized.ministryRequests);
    writeJSON(STORAGE_KEYS.audit, normalized.auditLog);
    return normalized;
  }

  function migrateLegacyPlatformState() {
    var state = createEmptyPlatformState();
    state.ministries = readJSON(STORAGE_KEYS.ministries, []);
    state.adminAccounts = readJSON(STORAGE_KEYS.adminAccounts, []);
    state.ministryRequests = readJSON(STORAGE_KEYS.ministryRequests, []);
    state.auditLog = readJSON(STORAGE_KEYS.audit, []);
    return savePlatformState(state);
  }

  function getPlatformState() {
    var existing = readJSON(STORAGE_KEYS.platformState, null);
    if (!existing) {
      return migrateLegacyPlatformState();
    }
    return savePlatformState(existing);
  }

  function updatePlatformState(mutator) {
    var state = getPlatformState();
    mutator(state);
    return savePlatformState(state);
  }

  function getMinistries() {
    return getPlatformState().ministries;
  }

  function saveMinistries(ministries) {
    updatePlatformState(function (state) {
      state.ministries = ministries;
    });
  }

  function getAdminAccounts() {
    return getPlatformState().adminAccounts;
  }

  function saveAdminAccounts(accounts) {
    updatePlatformState(function (state) {
      state.adminAccounts = accounts;
    });
  }

  function getMinistryRequests() {
    return getPlatformState().ministryRequests;
  }

  function saveMinistryRequests(requests) {
    updatePlatformState(function (state) {
      state.ministryRequests = requests;
    });
  }

  function getCitizens() {
    return readJSON(STORAGE_KEYS.citizens, []);
  }

  function getReports() {
    return readJSON(STORAGE_KEYS.complaints, []);
  }

  function saveReports(reports) {
    writeJSON(STORAGE_KEYS.complaints, reports);
  }

  function updateReportStatus(reportId, newStatus, actor) {
    var reports = getReports();
    var report = reports.find(function (r) { return r.id === reportId; });
    if (report) {
      report.status = newStatus;
      report.updatedAt = nowIso();
      saveReports(reports);
      logActivity("report_status_updated", "Status updated to " + newStatus, { reportId: reportId, status: newStatus }, actor && actor.id);
      return true;
    }
    return false;
  }

  function getAuditLog() {
    return getPlatformState().auditLog;
  }

  function getPlatformStorageSummary() {
    var state = getPlatformState();
    return {
      schemaVersion: state.schemaVersion,
      lastUpdatedAt: state.metadata.lastUpdatedAt,
      adminAccounts: state.adminAccounts.length,
      ministries: state.ministries.length,
      approvedMinistries: state.ministries.filter(function (item) {
        return item.status === "approved";
      }).length,
      pendingRequests: state.ministryRequests.filter(function (item) {
        return item.status === "pending";
      }).length,
      auditEntries: state.auditLog.length,
      citizens: getCitizens().length,
      reports: getReports().length,
      keys: {
        platformState: STORAGE_KEYS.platformState,
        citizens: STORAGE_KEYS.citizens,
        complaints: STORAGE_KEYS.complaints,
        language: STORAGE_KEYS.language,
        theme: STORAGE_KEYS.theme
      }
    };
  }

  function logActivity(type, message, extra, actorId) {
    updatePlatformState(function (state) {
      state.auditLog.push(normalizeAuditEntry({
        id: createId("audit"),
        type: type,
        message: typeof message === "string" ? message : "",
        payload: typeof message === "string" ? (extra || null) : (message || null),
        actorId: typeof message === "string" ? (actorId || null) : (extra || null),
        ts: nowIso()
      }));
      if (state.auditLog.length > 400) {
        state.auditLog = state.auditLog.slice(state.auditLog.length - 400);
      }
    });
  }

  function getLanguage() {
    var lang = localStorage.getItem(STORAGE_KEYS.language);
    return lang === "en" ? "en" : "ar";
  }

  function setLanguage(lang) {
    var safeLang = lang === "en" ? "en" : "ar";
    localStorage.setItem(STORAGE_KEYS.language, safeLang);
    if (document && document.documentElement) {
      document.documentElement.lang = safeLang;
      document.documentElement.dir = safeLang === "ar" ? "rtl" : "ltr";
    }
    updatePlatformState(function (state) {
      state.settings.language = safeLang;
    });
    return safeLang;
  }

  function toggleLanguage() {
    return setLanguage(getLanguage() === "ar" ? "en" : "ar");
  }

  function applyTranslations(dictionary) {
    var lang = setLanguage(getLanguage());
    var entries = dictionary && dictionary[lang] ? dictionary[lang] : {};

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      var key = element.getAttribute("data-i18n");
      if (Object.prototype.hasOwnProperty.call(entries, key)) {
        element.textContent = entries[key];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
      var key = element.getAttribute("data-i18n-placeholder");
      if (Object.prototype.hasOwnProperty.call(entries, key)) {
        element.setAttribute("placeholder", entries[key]);
      }
    });

    document.querySelectorAll("[data-i18n-title]").forEach(function (element) {
      var key = element.getAttribute("data-i18n-title");
      if (Object.prototype.hasOwnProperty.call(entries, key)) {
        element.setAttribute("title", entries[key]);
      }
    });
  }

  function getMinistryById(ministryId) {
    return getMinistries().find(function (item) {
      return item.id === ministryId;
    }) || null;
  }

  function getMinistryDisplayName(ministry, lang) {
    if (!ministry) {
      return "";
    }
    if (ministry.names && ministry.names[lang]) {
      return ministry.names[lang];
    }
    if (ministry.displayName) {
      return ministry.displayName;
    }
    return ministry.id;
  }

  function findMinistryByName(name) {
    var target = normalizeText(name);
    return getMinistries().find(function (ministry) {
      var names = [
        ministry.displayName,
        ministry.names && ministry.names.ar,
        ministry.names && ministry.names.en
      ];
      return names.some(function (entry) {
        return normalizeText(entry) === target;
      });
    }) || null;
  }

  function getApprovedMinistries() {
    return getMinistries().filter(function (item) {
      return item.status === "approved";
    });
  }

  function getAdminsByMinistry(ministryId) {
    return getAdminAccounts().filter(function (item) {
      return item.ministryId === ministryId;
    });
  }

  function getPendingMinistryRequests() {
    return getMinistryRequests().filter(function (item) {
      return item.status === "pending";
    });
  }

  function seedPlatformData() {
    updatePlatformState(function (state) {
      CORE_MINISTRIES.forEach(function (coreMinistry) {
        var existing = state.ministries.find(function (item) {
          return item.id === coreMinistry.id;
        });
        if (!existing) {
          state.ministries.push(normalizeMinistry({
            id: coreMinistry.id,
            code: coreMinistry.code,
            names: clone(coreMinistry.names),
            displayName: coreMinistry.names.ar,
            type: coreMinistry.type,
            status: coreMinistry.status,
            isSuperAdmin: !!coreMinistry.isSuperAdmin,
            category: coreMinistry.category,
            audience: coreMinistry.audience,
            pageSummary: clone(coreMinistry.pageSummary),
            permissions: clone(coreMinistry.permissions),
            createdAt: nowIso(),
            createdBy: "system"
          }));
          return;
        }

        existing.names = existing.names || clone(coreMinistry.names);
        existing.displayName = existing.displayName || coreMinistry.names.ar;
        existing.code = existing.code || coreMinistry.code;
        existing.type = "core";
        existing.status = existing.status || "approved";
        existing.category = existing.category || coreMinistry.category;
        existing.audience = existing.audience || coreMinistry.audience;
        existing.pageSummary = existing.pageSummary || clone(coreMinistry.pageSummary);
        existing.permissions = clone(coreMinistry.permissions);
        existing.isSuperAdmin = !!coreMinistry.isSuperAdmin || !!existing.isSuperAdmin;
      });

      DEFAULT_ADMINS.forEach(function (seededAdmin) {
        var existing = state.adminAccounts.find(function (account) {
          return normalizeText(account.username) === normalizeText(seededAdmin.username);
        });
        if (!existing) {
          state.adminAccounts.push(normalizeAdminAccount({
            id: seededAdmin.id,
            username: seededAdmin.username,
            fullName: seededAdmin.fullName,
            email: seededAdmin.email,
            phone: seededAdmin.phone,
            nationalId: seededAdmin.nationalId,
            ministryId: seededAdmin.ministryId,
            role: seededAdmin.role,
            status: seededAdmin.status,
            passwordHash: seededAdmin.passwordHash,
            passwordSalt: seededAdmin.passwordSalt,
            passwordVersion: seededAdmin.passwordVersion,
            isSeeded: true,
            createdAt: nowIso(),
            createdBy: "system"
          }));
          return;
        }

        existing.ministryId = existing.ministryId || seededAdmin.ministryId;
        existing.role = seededAdmin.role;
        existing.status = existing.status || "active";
        existing.passwordHash = seededAdmin.passwordHash;
        existing.passwordSalt = seededAdmin.passwordSalt;
        existing.passwordVersion = seededAdmin.passwordVersion;
        existing.isSeeded = true;
      });
    });
  }

  function setAdminSession(account) {
    sessionStorage.setItem(
      SESSION_KEYS.admin,
      JSON.stringify({
        accountId: account.id,
        ministryId: account.ministryId,
        role: account.role,
        loginAt: nowIso()
      })
    );
  }

  function clearAdminSession() {
    sessionStorage.removeItem(SESSION_KEYS.admin);
  }

  function getAdminSession() {
    try {
      var raw = sessionStorage.getItem(SESSION_KEYS.admin);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function getCurrentAdmin() {
    var session = getAdminSession();
    if (!session || !session.accountId) {
      return null;
    }
    return getAdminAccounts().find(function (item) {
      return item.id === session.accountId;
    }) || null;
  }

  function isSuperAdmin(account) {
    if (!account) {
      return false;
    }
    if (account.role === "super_admin") {
      return true;
    }
    var ministry = getMinistryById(account.ministryId);
    return !!(ministry && ministry.isSuperAdmin);
  }

  function hasPermission(account, permission) {
    if (!account) {
      return false;
    }
    if (isSuperAdmin(account)) {
      return true;
    }
    var ministry = getMinistryById(account.ministryId);
    var permissions = []
      .concat(account.permissions || [])
      .concat(ministry && ministry.permissions ? ministry.permissions : []);
    return permissions.indexOf(permission) !== -1;
  }

  function getHomeRouteForAdmin(account) {
    if (!account) {
      return "admin-login.html";
    }
    if (isSuperAdmin(account)) {
      return "admin-home.html";
    }
    return MINISTRY_ROUTES[account.ministryId] || "admin-home.html";
  }

  function verifyPassword(account, password) {
    if (!account || !account.passwordHash) {
      return false;
    }
    if (account.passwordVersion === "v2" && account.passwordSalt) {
      return account.passwordHash === hashPassword(password, account.passwordSalt);
    }
    return account.passwordHash === hashPassword(password);
  }

  function upgradeAccountPassword(accountId, plainPassword) {
    updatePlatformState(function (state) {
      var account = state.adminAccounts.find(function (item) {
        return item.id === accountId;
      });
      if (!account || account.passwordVersion === "v2") {
        return;
      }
      var nextPassword = createPasswordRecord(plainPassword);
      account.passwordHash = nextPassword.passwordHash;
      account.passwordSalt = nextPassword.passwordSalt;
      account.passwordVersion = nextPassword.passwordVersion;
      account.updatedAt = nowIso();
    });
  }

  function authenticateAdmin(payload) {
    var username = normalizeText(payload && payload.username);
    var password = String((payload && payload.password) || "");
    var ministryId = (payload && payload.ministryId) || "";
    var accounts = getAdminAccounts();
    var account = accounts.find(function (item) {
      return normalizeText(item.username) === username;
    });

    if (!account) {
      return { ok: false, code: "invalid_credentials" };
    }

    if (ministryId && account.ministryId !== ministryId) {
      return { ok: false, code: "invalid_ministry" };
    }

    if (!verifyPassword(account, password)) {
      return { ok: false, code: "invalid_credentials" };
    }

    if (account.passwordVersion !== "v2") {
      upgradeAccountPassword(account.id, password);
      account = getAdminAccounts().find(function (item) {
        return item.id === account.id;
      }) || account;
    }

    if (account.status === "pending") {
      return { ok: false, code: "account_pending", account: account };
    }

    if (account.status === "rejected") {
      return { ok: false, code: "account_rejected", account: account };
    }

    if (account.status !== "active") {
      return { ok: false, code: "account_inactive", account: account };
    }

    var ministry = getMinistryById(account.ministryId);
    if (!ministry || ministry.status !== "approved") {
      return { ok: false, code: "ministry_pending", account: account, ministry: ministry };
    }

    setAdminSession(account);
    logActivity("admin_login", "", { username: account.username, ministryId: account.ministryId }, account.id);
    return { ok: true, account: account, ministry: ministry };
  }

  function buildCustomMinistry(accountId, customMinistryName) {
    var baseId = slugify(customMinistryName) || createId("ministry");
    return normalizeMinistry({
      id: "custom-" + baseId + "-" + Math.random().toString(36).slice(2, 6),
      code: (baseId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 3) || "CUS").toUpperCase(),
      names: {
        ar: customMinistryName,
        en: customMinistryName
      },
      displayName: customMinistryName,
      type: "custom",
      status: "pending",
      category: "custom",
      audience: "custom",
      pageSummary: {
        ar: "جهة مضافة بانتظار مراجعة واعتماد رئاسة الوزراء قبل التفعيل الرسمي داخل المنصة.",
        en: "A newly submitted authority awaiting review and approval by the Prime Minister's Office."
      },
      permissions: clone(DEFAULT_MINISTRY_PERMISSIONS),
      createdAt: nowIso(),
      createdBy: accountId
    });
  }

  function registerAdmin(payload) {
    var fullName = String(payload && payload.fullName || "").trim();
    var username = normalizeText(payload && payload.username);
    var email = String(payload && payload.email || "").trim();
    var phone = String(payload && payload.phone || "").trim();
    var nationalId = String(payload && payload.nationalId || "").trim();
    var password = String(payload && payload.password || "");
    var ministryId = String(payload && payload.ministryId || "").trim();
    var customMinistryName = String(payload && payload.customMinistryName || "").trim();
    var accountId = createId("admin");
    var accountStatus = "active";
    var request = null;
    var ministry = null;
    var state = getPlatformState();
    var accounts = state.adminAccounts;
    var ministries = state.ministries;
    var requests = state.ministryRequests;

    if (!fullName || !username || !email || !phone || !nationalId || !password || !ministryId) {
      return { ok: false, code: "missing_fields" };
    }

    if (!/^\d{11}$/.test(phone)) {
      return { ok: false, code: "invalid_phone" };
    }

    if (!/^\d{14}$/.test(nationalId)) {
      return { ok: false, code: "invalid_national_id" };
    }

    if (password.length < 8) {
      return { ok: false, code: "weak_password" };
    }

    if (accounts.some(function (item) { return normalizeText(item.username) === username; })) {
      return { ok: false, code: "username_exists" };
    }

    if (accounts.some(function (item) { return normalizeText(item.email) === normalizeText(email); })) {
      return { ok: false, code: "email_exists" };
    }

    if (accounts.some(function (item) { return item.phone === phone; })) {
      return { ok: false, code: "phone_exists" };
    }

    if (accounts.some(function (item) { return item.nationalId === nationalId; })) {
      return { ok: false, code: "national_id_exists" };
    }

    if (ministryId === "other") {
      if (!customMinistryName) {
        return { ok: false, code: "custom_ministry_required" };
      }

      ministry = findMinistryByName(customMinistryName);
      if (!ministry) {
        ministry = buildCustomMinistry(accountId, customMinistryName);
        request = normalizeMinistryRequest({
          id: createId("request"),
          ministryId: ministry.id,
          requestedName: customMinistryName,
          status: "pending",
          submittedAt: nowIso(),
          requestedByAccountId: accountId
        });
        ministries.push(ministry);
        requests.push(request);
      }

      accountStatus = ministry.status === "approved" ? "active" : ministry.status === "rejected" ? "rejected" : "pending";
      ministryId = ministry.id;
    } else {
      ministry = getMinistryById(ministryId);
      if (!ministry || ministry.status !== "approved") {
        return { ok: false, code: "invalid_ministry_selection" };
      }
    }

    var passwordRecord = createPasswordRecord(password);
    var account = normalizeAdminAccount({
      id: accountId,
      username: username,
      fullName: fullName,
      email: email,
      phone: phone,
      nationalId: nationalId,
      ministryId: ministryId,
      role: "ministry_admin",
      status: accountStatus,
      passwordHash: passwordRecord.passwordHash,
      passwordSalt: passwordRecord.passwordSalt,
      passwordVersion: passwordRecord.passwordVersion,
      requestedMinistryName: customMinistryName || null,
      createdAt: nowIso(),
      createdBy: "self"
    });

    accounts.push(account);
    savePlatformState({
      schemaVersion: state.schemaVersion,
      metadata: state.metadata,
      settings: state.settings,
      ministries: ministries,
      adminAccounts: accounts,
      ministryRequests: requests,
      auditLog: state.auditLog
    });

    logActivity("admin_register", "", {
      username: account.username,
      ministryId: account.ministryId,
      requestId: request && request.id,
      status: account.status
    }, account.id);

    return {
      ok: true,
      account: account,
      ministry: getMinistryById(account.ministryId),
      request: request,
      pendingApproval: account.status !== "active"
    };
  }

  function approveMinistryRequest(requestId, actor) {
    var result = { ok: false, code: "request_not_found" };
    updatePlatformState(function (state) {
      var request = state.ministryRequests.find(function (item) {
        return item.id === requestId;
      });
      if (!request) {
        return;
      }
      var ministry = state.ministries.find(function (item) {
        return item.id === request.ministryId;
      });
      if (!ministry) {
        result = { ok: false, code: "ministry_not_found" };
        return;
      }

      request.status = "approved";
      request.reviewedAt = nowIso();
      request.reviewedBy = actor ? actor.id : null;

      ministry.status = "approved";
      ministry.approvedAt = nowIso();
      ministry.approvedBy = actor ? actor.id : null;

      state.adminAccounts.forEach(function (account) {
        if (account.ministryId === ministry.id && account.status === "pending") {
          account.status = "active";
          account.updatedAt = nowIso();
        }
      });

      result = { ok: true, request: request, ministry: ministry };
    });

    if (result.ok) {
      logActivity("ministry_approved", "", {
        requestId: result.request.id,
        ministryId: result.ministry.id
      }, actor && actor.id);
    }
    return result;
  }

  function rejectMinistryRequest(requestId, actor) {
    var result = { ok: false, code: "request_not_found" };
    updatePlatformState(function (state) {
      var request = state.ministryRequests.find(function (item) {
        return item.id === requestId;
      });
      if (!request) {
        return;
      }
      var ministry = state.ministries.find(function (item) {
        return item.id === request.ministryId;
      });

      request.status = "rejected";
      request.reviewedAt = nowIso();
      request.reviewedBy = actor ? actor.id : null;

      if (ministry) {
        ministry.status = "rejected";
        ministry.updatedAt = nowIso();
      }

      state.adminAccounts.forEach(function (account) {
        if (account.ministryId === request.ministryId && account.status === "pending") {
          account.status = "rejected";
          account.updatedAt = nowIso();
        }
      });

      result = { ok: true, request: request, ministry: ministry || null };
    });

    if (result.ok) {
      logActivity("ministry_rejected", "", {
        requestId: result.request.id,
        ministryId: result.request.ministryId
      }, actor && actor.id);
    }
    return result;
  }

  function renameMinistry(ministryId, newName, actor) {
    var value = String(newName || "").trim();
    if (!value) {
      return { ok: false, code: "empty_name" };
    }

    var result = { ok: false, code: "ministry_not_found" };
    updatePlatformState(function (state) {
      var ministry = state.ministries.find(function (item) {
        return item.id === ministryId;
      });
      if (!ministry) {
        return;
      }

      ministry.displayName = value;
      ministry.names = ministry.names || {};
      ministry.names.ar = value;
      if (!ministry.names.en || ministry.type === "custom") {
        ministry.names.en = value;
      }
      ministry.updatedAt = nowIso();
      ministry.updatedBy = actor ? actor.id : null;

      state.ministryRequests.forEach(function (request) {
        if (request.ministryId === ministryId && request.status === "pending") {
          request.requestedName = value;
        }
      });

      result = { ok: true, ministry: ministry };
    });

    if (result.ok) {
      logActivity("ministry_renamed", "", {
        ministryId: result.ministry.id,
        newName: value
      }, actor && actor.id);
    }
    return result;
  }

  function deleteMinistry(ministryId, actor) {
    var target = getMinistryById(ministryId);
    if (!target) {
      return { ok: false, code: "ministry_not_found" };
    }
    if (target.type === "core") {
      return { ok: false, code: "cannot_delete_core" };
    }

    updatePlatformState(function (state) {
      state.ministries = state.ministries.filter(function (item) {
        return item.id !== ministryId;
      });
      state.ministryRequests = state.ministryRequests.filter(function (item) {
        return item.ministryId !== ministryId;
      });
      state.adminAccounts = state.adminAccounts.map(function (account) {
        if (account.ministryId !== ministryId) {
          return account;
        }
        account.status = "rejected";
        account.deletedMinistry = true;
        account.requestedMinistryName = account.requestedMinistryName || target.displayName || getMinistryDisplayName(target, "ar");
        account.updatedAt = nowIso();
        return account;
      });
    });

    logActivity("ministry_deleted", "", { ministryId: ministryId }, actor && actor.id);
    return { ok: true };
  }

  function deleteAdminAccount(accountId, actor) {
    var accounts = getAdminAccounts();
    var target = accounts.find(function (item) {
      return item.id === accountId;
    });
    if (!target) {
      return { ok: false, code: "account_not_found" };
    }
    if (target.isSeeded) {
      return { ok: false, code: "cannot_delete_seeded" };
    }

    saveAdminAccounts(accounts.filter(function (item) {
      return item.id !== accountId;
    }));
    logActivity("admin_deleted", "", { accountId: accountId }, actor && actor.id);
    return { ok: true };
  }

  function resetPlatformData() {
    localStorage.removeItem(STORAGE_KEYS.platformState);
    localStorage.removeItem(STORAGE_KEYS.adminAccounts);
    localStorage.removeItem(STORAGE_KEYS.ministries);
    localStorage.removeItem(STORAGE_KEYS.ministryRequests);
    localStorage.removeItem(STORAGE_KEYS.citizens);
    localStorage.removeItem(STORAGE_KEYS.currentCitizen);
    localStorage.removeItem(STORAGE_KEYS.complaints);
    localStorage.removeItem(STORAGE_KEYS.audit);
    clearAdminSession();
    savePlatformState(createEmptyPlatformState());
    seedPlatformData();
  }

  function requireAdminAccess() {
    var current = getCurrentAdmin();
    if (!current) {
      window.location.href = "admin-login.html";
      return null;
    }
    return current;
  }

  function requireSuperAdmin() {
    var current = requireAdminAccess();
    if (!current) {
      return null;
    }
    if (!isSuperAdmin(current)) {
      window.location.href = getHomeRouteForAdmin(current);
      return null;
    }
    return current;
  }

  savePlatformState(getPlatformState());
  seedPlatformData();
  setLanguage(getLanguage());

  global.URSAPlatform = {
    STORAGE_KEYS: STORAGE_KEYS,
    SESSION_KEYS: SESSION_KEYS,
    MINISTRY_ROUTES: MINISTRY_ROUTES,
    CORE_MINISTRIES: CORE_MINISTRIES,
    escapeHtml: escapeHtml,
    hashPassword: hashPassword,
    createPasswordRecord: createPasswordRecord,
    setLanguage: setLanguage,
    getLanguage: getLanguage,
    toggleLanguage: toggleLanguage,
    applyTranslations: applyTranslations,
    seedPlatformData: seedPlatformData,
    resetPlatformData: resetPlatformData,
    getPlatformState: getPlatformState,
    getPlatformStorageSummary: getPlatformStorageSummary,
    getMinistries: getMinistries,
    getMinistryById: getMinistryById,
    getApprovedMinistries: getApprovedMinistries,
    getMinistryDisplayName: getMinistryDisplayName,
    getAdminsByMinistry: getAdminsByMinistry,
    getPendingMinistryRequests: getPendingMinistryRequests,
    getMinistryRequests: getMinistryRequests,
    getAdminAccounts: getAdminAccounts,
    getCitizens: getCitizens,
    getReports: getReports,
    saveReports: saveReports,
    updateReportStatus: updateReportStatus,
    getAuditLog: getAuditLog,
    logActivity: logActivity,
    getCurrentAdmin: getCurrentAdmin,
    getAdminSession: getAdminSession,
    clearAdminSession: clearAdminSession,
    isSuperAdmin: isSuperAdmin,
    hasPermission: hasPermission,
    getHomeRouteForAdmin: getHomeRouteForAdmin,
    authenticateAdmin: authenticateAdmin,
    registerAdmin: registerAdmin,
    approveMinistryRequest: approveMinistryRequest,
    rejectMinistryRequest: rejectMinistryRequest,
    renameMinistry: renameMinistry,
    deleteMinistry: deleteMinistry,
    deleteAdminAccount: deleteAdminAccount,
    requireAdminAccess: requireAdminAccess,
    requireSuperAdmin: requireSuperAdmin
  };
})(window);
