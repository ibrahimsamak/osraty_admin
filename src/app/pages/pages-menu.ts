import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'الرئيسية',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
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
      {
        title: 'ادارة وحدات الشراء',
        link: '/pages/constant/buyunits',
      },
      {
        title: 'ادارة مابعد الشراء',
        link: '/pages/constant/unitsoptions',
      },
      {
        title: 'خيارات التوصيل',
        link: '/pages/constant/delivery',
      },
      {
        title: 'اسلوب الاستلام',
        link: '/pages/constant/deliveryoptions',
      },
      {
        title: 'السوشيال ميديا',
        link: '/pages/constant/sociallink',
      },
      {
        title: 'معلومات التواصل',
        link: '/pages/constant/contactinfo',
      },
      {
        title: 'ادارة الصفحات الثابتة',
        link: '/pages/constant/staticpage',
      }
    ],
  },
  {
    title: 'الموردين والمنتجات',
    group: true,
  },
  {
    title: 'الهايبرات والاصناف',
    icon: 'nb-e-commerce',
    children: [
      {
        title: 'ادارة الأصناف الرئيسية',
        link: '/pages/product/category',
      },
      {
        title: 'ادارة الأصناف الفرعية',
        link: '/pages/product/subcategory',
      },
      {
        title: 'ادارة الهايبرات',
        link: '/pages/product/supplier',
      }
    ],
  },
  {
    title: 'المنتجات',
    icon: 'nb-tables',
    children: [
      {
        title: 'اضافة منتج',
        link: '/pages/product/product',
      },
      {
        title: 'ادارة المنتجات',
        link: '/pages/product/products',
      },
      {
        title: 'اضافة منتجات الهايبرات',
        link: '/pages/product/addsupplierproducts',
      },
      {
        title: 'ادارة منتجات الهايبرات',
        link: '/pages/product/supplierproducts',
      },
    ],
  },
  {
    title: 'الاعلانات والعروض',
    group: true,
  },
  {
    title: 'الاعلانات والعروض',
    icon: 'nb-compose',
    children: [
      {
        title: 'ادارة الاعلانات',
        link: '/pages/adv/AddAdv',
      },
      {
        title: 'اضافة سلة',
        link: '/pages/basket/addbasket',
      },
      {
        title: 'ادارة السلة',
        link: '/pages/basket/basket',
      },
      {
        title: 'اضافة منتجات باقات التوفير',
        link: '/pages/offer/addoffer',
      },
      {
        title: 'ادارة باقات التوفير',
        link: '/pages/offer/offer',
      }
    ],
  },
  {
    title: 'العملاء والسائقين',
    group: true,
  },
  {
    title: 'المستخدمين',
    icon: 'nb-person',
    children: [
      {
        title: 'ادارة المستخدمين',
        link: '/pages/users/clients',
      }
    ],
  },
  {
    title: 'Editors',
    icon: 'nb-title',
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/pages/editors/ckeditor',
      },
    ],
  },
  {
    title: 'Tables',
    icon: 'nb-tables',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table',
      },
    ],
  },
  {
    title: 'Miscellaneous',
    icon: 'nb-shuffle',
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
