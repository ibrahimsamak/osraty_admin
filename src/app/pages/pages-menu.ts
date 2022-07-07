import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'الرئيسية',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'النظام',
    group: true,
  },
  {
    title: 'مستخدمين النظام',
    icon: 'nb-person',
    children: [
      {
        title: 'ادارة مشرفين النظام ',
        link: '/pages/superadmin/AddSuperAdmin',
      }
    ]
  },
  {
    title: 'الثوابت',
    group: true,
  },
  {
    title: 'الثوابت',
    icon: 'nb-keypad',
    link: '/pages/constant',
    children: [
      // {
      //   title: 'المسميات الوظيفية',
      //   link: '/pages/constant/jobs',
      // },
      {
        title: 'انواع التبرع',
        link: '/pages/constant/paymentMetod',
      },
      {
        title: 'انواع الطلبات',
        link: '/pages/constant/paymentFor',
      },
      {
        title: 'الصفحات الثابتة',
        link: '/pages/constant/staticpage',
      },
      {
        title: 'الحسابات البنكية',
        link: '/pages/constant/bankaccount',
      },
      {
        title: 'رفع الملفات',
        link: '/pages/constant/files',
      },
    ],
  },
  {
    title: 'الاشعارات والتنبيهات',
    group: true,
  },
  {
    title: 'التنبيهات',
    icon: 'nb-keypad',
    link: '/pages/constant',
    children: [
      {
        title: 'اتصل بنا',
        link: '/pages/constant/contactUs',
      },
      {
        title: 'ارسال تنبيه',
        link: '/pages/constant/sendNotification',
      },
    ],
  },
  {
    title: 'الأخبار والمناسبات',
    group: true,
  },
  {
    title: 'الاخبار',
    icon: 'nb-e-commerce',
    children: [
      {
        title: 'ادارة الأخبار',
        link: '/pages/news/AddAdv',
      },
      {
        title: 'ادارة المناسبات',
        link: '/pages/news/AddEvent',
      },
      {
        title: 'حضور المناسبات',
        link: '/pages/news/Attend',
      }
    ]
  },
  {
    title: 'ادارة المستخدمين',
    group: true,
  },
  {
    title: 'المستخدمين',
    icon: 'nb-person',
    children: [
      {
        title: 'ادارة المستفيدين',
        link: '/pages/users/users',
      },
      {
        title: 'ادارة المتبرعين',
        link: '/pages/users/admins',
      }
    ]
  },
  {
    title: 'التقارير والارشيف',
    group: true,
  },
  {
    title: 'الأرشيف',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'طلبات المستفيدين',
        link: '/pages/orders/requests',
      },
      {
        title: 'التبرعات الشهرية',
        link: '/pages/orders/addPaymentToUser',
      }
    ]
  },
  {
    title: 'التقارير',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'التبرعات الواردة',
        link: '/pages/report/funcder',
      },
      {
        title: 'التبرعات الصادرة',
        link: '/pages/report/beneficiary',
      },
      {
        title: 'الطلبات',
        link: '/pages/report/request',
      }
    ]
  }
];
