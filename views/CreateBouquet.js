import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import HeaderBar from '../components/HeaderBar';
import { colors } from '../constants/colors';
import { SvgXml } from 'react-native-svg';
import Button from '../components/Button';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { auth, firebase } from '../firebase';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { encode } from 'base-64';

const axios = require('axios').default;

const accountSid = 'ACa1ba0a3ad00b6544ce4f2d56a96d2cbf';
const authToken = 'fa3518f45ea5bcfdaca5f8ecdffb3737';
const authHeader = 'Basic ' + encode(`${accountSid}:${authToken}`);

// const client = require('twilio')(accountSid, authToken);

const otherInfoIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.99996 13.1667C9.23607 13.1667 9.43413 13.0867 9.59413 12.9267C9.75413 12.7667 9.83385 12.5689 9.83329 12.3334V9.00002C9.83329 8.76391 9.75329 8.56585 9.59329 8.40585C9.43329 8.24585 9.23551 8.16613 8.99996 8.16669C8.76385 8.16669 8.56579 8.24669 8.40579 8.40669C8.24579 8.56669 8.16607 8.76446 8.16663 9.00002V12.3334C8.16663 12.5695 8.24663 12.7675 8.40663 12.9275C8.56663 13.0875 8.7644 13.1672 8.99996 13.1667ZM8.99996 6.50002C9.23607 6.50002 9.43413 6.42002 9.59413 6.26002C9.75413 6.10002 9.83385 5.90224 9.83329 5.66669C9.83329 5.43058 9.75329 5.23252 9.59329 5.07252C9.43329 4.91252 9.23551 4.8328 8.99996 4.83335C8.76385 4.83335 8.56579 4.91335 8.40579 5.07335C8.24579 5.23335 8.16607 5.43113 8.16663 5.66669C8.16663 5.9028 8.24663 6.10085 8.40663 6.26085C8.56663 6.42085 8.7644 6.50058 8.99996 6.50002ZM8.99996 17.3334C7.84718 17.3334 6.76385 17.1145 5.74996 16.6767C4.73607 16.2389 3.85413 15.6453 3.10413 14.8959C2.35413 14.1459 1.76051 13.2639 1.32329 12.25C0.886071 11.2361 0.667182 10.1528 0.666626 9.00002C0.666626 7.84724 0.885515 6.76391 1.32329 5.75002C1.76107 4.73613 2.35468 3.85419 3.10413 3.10419C3.85413 2.35419 4.73607 1.76058 5.74996 1.32335C6.76385 0.886132 7.84718 0.667243 8.99996 0.666687C10.1527 0.666687 11.2361 0.885576 12.25 1.32335C13.2638 1.76113 14.1458 2.35474 14.8958 3.10419C15.6458 3.85419 16.2397 4.73613 16.6775 5.75002C17.1152 6.76391 17.3338 7.84724 17.3333 9.00002C17.3333 10.1528 17.1144 11.2361 16.6766 12.25C16.2388 13.2639 15.6452 14.1459 14.8958 14.8959C14.1458 15.6459 13.2638 16.2397 12.25 16.6775C11.2361 17.1153 10.1527 17.3339 8.99996 17.3334ZM8.99996 15.6667C10.8611 15.6667 12.4375 15.0209 13.7291 13.7292C15.0208 12.4375 15.6666 10.8611 15.6666 9.00002C15.6666 7.13891 15.0208 5.56252 13.7291 4.27085C12.4375 2.97919 10.8611 2.33335 8.99996 2.33335C7.13885 2.33335 5.56246 2.97919 4.27079 4.27085C2.97913 5.56252 2.33329 7.13891 2.33329 9.00002C2.33329 10.8611 2.97913 12.4375 4.27079 13.7292C5.56246 15.0209 7.13885 15.6667 8.99996 15.6667Z" fill="#678C96" fill-opacity="0.7"/>
</svg>
`;
const penIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.0625 7.86561C19.0631 7.66035 19.0229 7.45701 18.9443 7.26739C18.8657 7.07776 18.7503 6.90562 18.6047 6.76092L13.2391 1.39452C13.094 1.24936 12.9217 1.13421 12.7321 1.05564C12.5425 0.977082 12.3392 0.936646 12.134 0.936646C11.9287 0.936646 11.7255 0.977082 11.5359 1.05564C11.3463 1.13421 11.174 1.24936 11.0289 1.39452L8.85547 3.56795L4.3836 5.2453C4.12678 5.34153 3.89982 5.50366 3.72552 5.7154C3.55122 5.92714 3.43572 6.18103 3.39063 6.45155L1.575 17.3437C1.55227 17.4782 1.55916 17.616 1.59518 17.7476C1.6312 17.8791 1.69549 18.0012 1.78356 18.1054C1.87163 18.2095 1.98137 18.2932 2.10511 18.3505C2.22885 18.4079 2.36361 18.4376 2.5 18.4375C2.55234 18.4377 2.60461 18.4335 2.65625 18.425L13.5508 16.6086C13.821 16.563 14.0746 16.4475 14.2862 16.2734C14.4979 16.0993 14.6602 15.8728 14.757 15.6164L16.4336 11.1437L18.607 8.9703C18.7522 8.82543 18.8673 8.6532 18.9454 8.46358C19.0236 8.27396 19.0634 8.07071 19.0625 7.86561ZM13.0625 14.789L5.23438 16.0937L7.8125 13.5156C8.37913 13.7714 9.01752 13.8203 9.61651 13.6539C10.2155 13.4875 10.7371 13.1162 11.0906 12.6048C11.444 12.0933 11.6069 11.4741 11.5508 10.855C11.4947 10.2358 11.2232 9.65595 10.7836 9.21635C10.344 8.77675 9.76418 8.50527 9.14503 8.44918C8.52588 8.3931 7.90667 8.55596 7.39523 8.9094C6.8838 9.26284 6.51253 9.78448 6.3461 10.3835C6.17966 10.9825 6.22859 11.6209 6.48438 12.1875L3.90625 14.7656L5.21094 6.93748L9.14063 5.46405L14.5352 10.8594L13.0625 14.789ZM8.125 11.0937C8.125 10.9392 8.17082 10.7882 8.25667 10.6597C8.34251 10.5312 8.46453 10.4311 8.60728 10.372C8.75004 10.3128 8.90712 10.2974 9.05867 10.3275C9.21021 10.3576 9.34942 10.432 9.45868 10.5413C9.56794 10.6506 9.64235 10.7898 9.67249 10.9413C9.70264 11.0929 9.68716 11.2499 9.62803 11.3927C9.5689 11.5355 9.46877 11.6575 9.34029 11.7433C9.21182 11.8292 9.06077 11.875 8.90625 11.875C8.69905 11.875 8.50034 11.7927 8.35383 11.6462C8.20731 11.4996 8.125 11.3009 8.125 11.0937ZM15.625 9.29686L10.7031 4.37498L12.1359 2.94217L17.0578 7.86405L15.625 9.29686Z" fill="#678C96" fill-opacity="0.7"/>
</svg>
`;
const flowerIcon = `<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5783 9.90834C5.668 9.77425 5.76422 9.64465 5.86664 9.52C5.64384 9.09985 5.52765 8.6314 5.5283 8.15584C4.97956 7.61149 4.66926 6.87164 4.66551 6.09872C4.66176 5.3258 4.96487 4.58298 5.5083 4.03334C5.51441 3.26772 5.82131 2.5352 6.36278 1.99389C6.90425 1.45258 7.63685 1.14588 8.40247 1.14C8.67418 0.858107 9.00001 0.633976 9.36044 0.481044C9.72086 0.328112 10.1084 0.249528 10.5 0.250002C11.2858 0.250002 11.9991 0.560835 12.5233 1.06667C12.9077 1.0648 13.2886 1.13884 13.6443 1.28454C14 1.43024 14.3234 1.64474 14.596 1.91572C14.8686 2.1867 15.0851 2.50883 15.2329 2.86364C15.3807 3.21845 15.457 3.59896 15.4575 3.98334C16.016 4.53973 16.331 5.29497 16.3333 6.08334C16.3333 6.875 16.0175 7.59417 15.505 8.11917V8.16667C15.505 8.55365 15.4281 8.93677 15.2786 9.29371C15.1291 9.65066 14.9101 9.97428 14.6343 10.2457C14.3585 10.5172 14.0314 10.7311 13.6721 10.8749C13.3129 11.0187 12.9286 11.0895 12.5416 11.0833C12.0158 11.5983 11.295 11.9167 10.5 11.9167C9.69997 11.9167 8.97497 11.5942 8.44747 11.0725C7.95823 11.0733 7.47671 10.9506 7.04747 10.7158C6.63543 11.2788 6.42221 11.9628 6.44137 12.6602C6.46053 13.3576 6.71097 14.0288 7.1533 14.5683L8.64497 16.3883C8.78509 16.5593 8.85157 16.7789 8.82976 16.9989C8.80796 17.2188 8.69967 17.4211 8.52872 17.5613C8.35777 17.7014 8.13815 17.7678 7.91819 17.746C7.69822 17.7242 7.49593 17.616 7.3558 17.445L5.86414 15.625C5.51834 15.204 5.24669 14.7272 5.0608 14.215C4.62174 14.459 4.12291 14.5745 3.6213 14.5484C3.11969 14.5223 2.63553 14.3557 2.22414 14.0675C1.41747 13.5017 0.728304 11.6833 0.157471 8.61167C2.7758 8.75917 4.4883 9.11584 5.2958 9.68084C5.3958 9.75167 5.4908 9.8275 5.57914 9.90917L5.5783 9.90834ZM9.13247 9.405L9.6208 9.88834C9.85414 10.1192 10.165 10.25 10.5 10.25C10.8333 10.25 11.1416 10.1217 11.375 9.8925L11.8716 9.40584L12.5675 9.41667C13.2791 9.41667 13.8383 8.8575 13.8383 8.16667L13.8275 7.4525L14.3116 6.95584C14.5391 6.7225 14.6666 6.415 14.6666 6.08334C14.6666 5.74167 14.5308 5.425 14.2916 5.19L13.7866 4.69584L13.7908 3.99C13.7908 3.2925 13.2316 2.7325 12.5408 2.7325L11.855 2.73667L11.3675 2.26667C11.1351 2.04122 10.8237 1.91561 10.5 1.91667C10.3321 1.91619 10.1658 1.94977 10.0113 2.01537C9.85673 2.08097 9.71709 2.17723 9.6008 2.29834L9.11497 2.80084L8.41497 2.80667C8.08691 2.80928 7.77303 2.94076 7.54105 3.17275C7.30907 3.40473 7.17759 3.71861 7.17497 4.04667L7.16997 4.72334L6.69414 5.205C6.4633 5.43834 6.3333 5.74834 6.3333 6.08334C6.3333 6.4225 6.46664 6.73584 6.70247 6.97084L7.1958 7.46V8.155C7.1958 8.48652 7.3275 8.80447 7.56192 9.03889C7.79634 9.27331 8.11428 9.405 8.4458 9.405H9.13247ZM10.5 7.75C10.0579 7.75 9.63402 7.57441 9.32146 7.26185C9.0089 6.94929 8.8333 6.52536 8.8333 6.08334C8.8333 5.64131 9.0089 5.21738 9.32146 4.90482C9.63402 4.59226 10.0579 4.41667 10.5 4.41667C10.942 4.41667 11.3659 4.59226 11.6785 4.90482C11.991 5.21738 12.1666 5.64131 12.1666 6.08334C12.1666 6.52536 11.991 6.94929 11.6785 7.26185C11.3659 7.57441 10.942 7.75 10.5 7.75ZM3.1808 12.7017C3.40053 12.8429 3.66637 12.8935 3.92263 12.8431C4.17888 12.7926 4.40565 12.6449 4.55541 12.4309C4.70517 12.2169 4.7663 11.9533 4.72598 11.6952C4.68566 11.4372 4.54703 11.2048 4.33914 11.0467C4.0408 10.8375 3.3408 10.6375 2.2808 10.485C2.6308 11.79 2.96914 12.5542 3.1808 12.7017Z" fill="#678C96" fill-opacity="0.7"/>
</svg>
`;
const paymentIcon = `<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6666 0.333336H2.33329C1.40829 0.333336 0.674959 1.075 0.674959 2L0.666626 12C0.666626 12.925 1.40829 13.6667 2.33329 13.6667H15.6666C16.5916 13.6667 17.3333 12.925 17.3333 12V2C17.3333 1.075 16.5916 0.333336 15.6666 0.333336ZM15.6666 12H2.33329V7H15.6666V12ZM15.6666 3.66667H2.33329V2H15.6666V3.66667Z" fill="#678C96" fill-opacity="0.7"/>
</svg>
`;
const recycleIcon = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.2" d="M11.7188 3.28125V12.1875C11.7188 12.3118 11.6694 12.431 11.5815 12.519C11.4935 12.6069 11.3743 12.6562 11.25 12.6562H3.75C3.62568 12.6562 3.50645 12.6069 3.41854 12.519C3.33064 12.431 3.28125 12.3118 3.28125 12.1875V3.28125H11.7188Z" fill="black"/>
<path d="M12.6562 2.8125H10.3125V2.34375C10.3125 1.97079 10.1643 1.6131 9.90062 1.34938C9.6369 1.08566 9.27921 0.9375 8.90625 0.9375H6.09375C5.72079 0.9375 5.3631 1.08566 5.09938 1.34938C4.83566 1.6131 4.6875 1.97079 4.6875 2.34375V2.8125H2.34375C2.21943 2.8125 2.1002 2.86189 2.01229 2.94979C1.92439 3.0377 1.875 3.15693 1.875 3.28125C1.875 3.40557 1.92439 3.5248 2.01229 3.61271C2.1002 3.70061 2.21943 3.75 2.34375 3.75H2.8125V12.1875C2.8125 12.4361 2.91127 12.6746 3.08709 12.8504C3.2629 13.0262 3.50136 13.125 3.75 13.125H11.25C11.4986 13.125 11.7371 13.0262 11.9129 12.8504C12.0887 12.6746 12.1875 12.4361 12.1875 12.1875V3.75H12.6562C12.7806 3.75 12.8998 3.70061 12.9877 3.61271C13.0756 3.5248 13.125 3.40557 13.125 3.28125C13.125 3.15693 13.0756 3.0377 12.9877 2.94979C12.8998 2.86189 12.7806 2.8125 12.6562 2.8125ZM5.625 2.34375C5.625 2.21943 5.67439 2.1002 5.76229 2.01229C5.8502 1.92439 5.96943 1.875 6.09375 1.875H8.90625C9.03057 1.875 9.1498 1.92439 9.23771 2.01229C9.32561 2.1002 9.375 2.21943 9.375 2.34375V2.8125H5.625V2.34375ZM11.25 12.1875H3.75V3.75H11.25V12.1875ZM6.5625 6.09375V9.84375C6.5625 9.96807 6.51311 10.0873 6.42521 10.1752C6.3373 10.2631 6.21807 10.3125 6.09375 10.3125C5.96943 10.3125 5.8502 10.2631 5.76229 10.1752C5.67439 10.0873 5.625 9.96807 5.625 9.84375V6.09375C5.625 5.96943 5.67439 5.8502 5.76229 5.76229C5.8502 5.67439 5.96943 5.625 6.09375 5.625C6.21807 5.625 6.3373 5.67439 6.42521 5.76229C6.51311 5.8502 6.5625 5.96943 6.5625 6.09375ZM9.375 6.09375V9.84375C9.375 9.96807 9.32561 10.0873 9.23771 10.1752C9.1498 10.2631 9.03057 10.3125 8.90625 10.3125C8.78193 10.3125 8.6627 10.2631 8.57479 10.1752C8.48689 10.0873 8.4375 9.96807 8.4375 9.84375V6.09375C8.4375 5.96943 8.48689 5.8502 8.57479 5.76229C8.6627 5.67439 8.78193 5.625 8.90625 5.625C9.03057 5.625 9.1498 5.67439 9.23771 5.76229C9.32561 5.8502 9.375 5.96943 9.375 6.09375Z" fill="black"/>
</svg>
`;
const removeItem = `<svg width="6" height="2" viewBox="0 0 6 2" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 1.41585H0.499995C0.389488 1.41585 0.283507 1.37195 0.205367 1.29381C0.127227 1.21567 0.0833282 1.10969 0.0833282 0.999186C0.0833282 0.888679 0.127227 0.782699 0.205367 0.704558C0.283507 0.626418 0.389488 0.58252 0.499995 0.58252H5.5C5.6105 0.58252 5.71648 0.626418 5.79462 0.704558C5.87276 0.782699 5.91666 0.888679 5.91666 0.999186C5.91666 1.10969 5.87276 1.21567 5.79462 1.29381C5.71648 1.37195 5.6105 1.41585 5.5 1.41585Z" fill="black"/>
</svg>
`;
const addItem = `<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.50001 3.41585H3.41668V5.49919C3.41668 5.60969 3.37278 5.71567 3.29464 5.79381C3.2165 5.87195 3.11052 5.91585 3.00001 5.91585C2.8895 5.91585 2.78352 5.87195 2.70538 5.79381C2.62724 5.71567 2.58334 5.60969 2.58334 5.49919V3.41585H0.50001C0.389503 3.41585 0.283523 3.37195 0.205382 3.29381C0.127242 3.21567 0.0833435 3.10969 0.0833435 2.99919C0.0833435 2.88868 0.127242 2.7827 0.205382 2.70456C0.283523 2.62642 0.389503 2.58252 0.50001 2.58252H2.58334V0.499186C2.58334 0.388679 2.62724 0.282698 2.70538 0.204558C2.78352 0.126418 2.8895 0.0825195 3.00001 0.0825195C3.11052 0.0825195 3.2165 0.126418 3.29464 0.204558C3.37278 0.282698 3.41668 0.388679 3.41668 0.499186V2.58252H5.50001C5.61052 2.58252 5.7165 2.62642 5.79464 2.70456C5.87278 2.7827 5.91668 2.88868 5.91668 2.99919C5.91668 3.10969 5.87278 3.21567 5.79464 3.29381C5.7165 3.37195 5.61052 3.41585 5.50001 3.41585Z" fill="black"/>
</svg>
`;

const headerNavigation = [
  {
    title: 'Step 1/4',
    subtitle: 'Create your bouquet',
    icon: flowerIcon,
    isOpen: true,
  },
  {
    title: 'Step 2/4',
    subtitle: 'Special notes',
    icon: otherInfoIcon,
    isOpen: false,
  },
  {
    title: 'Step 3/4',
    subtitle: 'Order details',
    icon: penIcon,
    isOpen: false,
  },
  {
    title: 'Step 4/4',
    subtitle: 'Shipping info',
    icon: paymentIcon,
    isOpen: false,
  },
];

const items = [
  // name key is must. It is to show the text in front
  { label: 'Rose', value: 'Rose' },
  { label: 'Astrantia', value: 'Astrantia' },
  { label: 'Lavender', value: 'Lavender' },
  { label: 'Lily ', value: 'Lily' },
  { label: 'Eryngium ', value: 'Eryngium' },
  { label: 'Scabiosa ', value: 'Scabiosa' },
  { label: 'Pale rose ', value: 'Pale rose' },
];

let moment = require('moment');
const CreateBouquet = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = React.useState([]);
  const [formData, setFormData] = useState({
    vaseType: '',
    material: '',
    flowers: [],
    note: '',
    dateAndTime: new Date(),
    streetAddress: '',
    postalCode: '',
    city: '',
    country: 'Croatia',
    userEmail: auth.currentUser?.email,
  });
  const [showPicker, setShowPicker] = useState(false);

  const handleNavigationPress = (index) => {
    setActiveIndex(index);
  };

  const isDisabled = (formData) => {
    if (
      formData.vaseType == '' ||
      formData.material == '' ||
      formData.flowers.length == 0
    ) {
      return true;
    }
    return false;
  };

  const resetForm = () => {
    setFormData({
      vaseType: '',
      material: '',
      flowers: [],
      note: '',
      dateAndTime: new Date(),
      streetAddress: '',
      postalCode: '',
      city: '',
      country: 'Croatia',
      userEmail: auth.currentUser?.email,
    });
  };

  const showAlert = () => {
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.'
          ),
      }
    );
  };

  const renderDataItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };

  //Date time picker methods
  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  const hideDateTimePicker = () => {
    setShowPicker(false);
  };

  const handleConfirm = (selectedDateTime) => {
    let unixTimestamp = moment(selectedDateTime).unix();
    setFormData({ ...formData, dateAndTime: selectedDateTime });
    hideDateTimePicker();
  };

  const handleCancel = () => {
    hideDateTimePicker();
  };
  //Date time picker methods END

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      flowers: selected,
    }));
  }, [selected]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderBar />

      <View style={styles.formContainerWrapper}>
        <View style={styles.formContainer}>
          <View style={styles.formHeader}>
            {headerNavigation.map((item, index) => (
              <View
                key={index}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <TouchableOpacity
                  style={[
                    activeIndex === index && styles.activeIcon,
                    index !== headerNavigation.length - 1 && {
                      borderRightColor: colors.dustyRose,
                      borderRightWidth: 1,
                    },
                  ]}
                >
                  <SvgXml
                    xml={item.icon}
                    width={25}
                    height={25}
                    opacity={activeIndex === index ? 1 : 0.6}
                    style={[activeIndex !== index && styles.formHeaderIcon]}
                  />
                </TouchableOpacity>
                {activeIndex === index && (
                  <View
                    style={[
                      index !== headerNavigation.length - 1 && {
                        borderRightWidth: 1,
                        borderRightColor: colors.dustyRose,
                      },
                      styles.titleWrapper,
                    ]}
                  >
                    <Text style={styles.formHeaderTitle}>{item.title}</Text>
                    <Text style={styles.formHeaderSubtitle}>
                      {item.subtitle}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          <View>
            {activeIndex === 0 && (
              <View style={styles.stepsWrapper}>
                <View style={styles.selectBoxWrapper}>
                  <Text style={styles.selectBoxLabel}>Vase Type</Text>
                  <Picker
                    selectedValue={formData.vaseType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, vaseType: value })
                    }
                    style={styles.selectPicker}
                    required={true}
                  >
                    <Picker.Item label="Pick a vase type" value="" />
                    <Picker.Item label="Mason Jar" value="Mason Jar" />
                    <Picker.Item label="Rustic Vase" value="Rustic" />
                    <Picker.Item label="Bouquet Vase" value="Bouquet" />
                    <Picker.Item label="Ceramic Vase" value="Ceramic" />
                  </Picker>
                </View>

                <View style={styles.selectBoxWrapper}>
                  <Text style={styles.selectBoxLabel}>Color</Text>
                  <Picker
                    selectedValue={formData.material}
                    onValueChange={(value) =>
                      setFormData({ ...formData, material: value })
                    }
                    style={styles.selectPicker}
                  >
                    <Picker.Item label="Pick a vase/bouquet color" value="" />
                    <Picker.Item label="Red" value="red" />
                    <Picker.Item label="Green" value="green" />
                    <Picker.Item label="Blue" value="blue" />
                    <Picker.Item label="Purple" value="purple" />
                  </Picker>
                </View>

                <View>
                  <Text style={styles.selectBoxLabel}>Flowers</Text>
                  <MultiSelect
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    iconColor="#000"
                    data={items}
                    labelField="label"
                    valueField="value"
                    placeholder={`Select multiple items (${selected.length} selected)`}
                    value={formData.flowers}
                    search
                    searchPlaceholder="Search..."
                    onChange={(items) => {
                      setSelected(items);
                    }}
                    renderItem={renderDataItem}
                    renderSelectedItem={(item, unSelect) => (
                      <TouchableOpacity
                        onPress={() => unSelect && unSelect(item)}
                      >
                        <View style={styles.selectedStyle}>
                          <Text style={styles.textSelectedStyle}>
                            {item.label}
                          </Text>

                          <AntDesign color="black" name="delete" size={17} />
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    marginRight: 10,
                    marginTop: 20,
                  }}
                >
                  <Button
                    buttonLabel="Next step"
                    bgColor={
                      isDisabled(formData)
                        ? 'rgba(103, 140, 150, 0.5)'
                        : colors.slateBlue
                    }
                    textColor={
                      isDisabled(formData)
                        ? 'rgba(103, 140, 150, 0.6)'
                        : colors.buttonText
                    }
                    additionalStyles={{
                      minWidth: 100,
                      marginBottom: 100,
                    }}
                    borderRadius={5}
                    onPress={() => {
                      setActiveIndex(activeIndex + 1);
                      console.log(JSON.stringify(formData, null, 2));
                    }}
                    isDisabled={isDisabled(formData)}
                  />
                </View>
              </View>
            )}
            {activeIndex === 1 && (
              <View style={[styles.stepsWrapper, styles.textInputContainer]}>
                <Text style={styles.stepTwoText}>
                  Your special notes/wishes are...
                </Text>
                <TextInput
                  placeholder="Type in whatever you want"
                  placeholderTextColor={colors.dustyRose}
                  editable
                  multiline
                  numberOfLines={1}
                  maxLength={300}
                  value={formData.note}
                  onChangeText={(text) =>
                    setFormData({ ...formData, note: text })
                  }
                  style={styles.textInput}
                  cursorColor={colors.babyPink}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    marginRight: 32,
                    marginTop: 20,
                  }}
                >
                  <Button
                    buttonLabel="Back"
                    additionalStyles={{
                      minWidth: 100,
                    }}
                    textColor={colors.slateBlue}
                    onPress={() => setActiveIndex(activeIndex - 1)}
                  />
                  <Button
                    buttonLabel="Next step"
                    bgColor={colors.slateBlue}
                    textColor={colors.buttonText}
                    additionalStyles={{
                      minWidth: 100,
                    }}
                    borderRadius={5}
                    onPress={() => {
                      setActiveIndex(activeIndex + 1);
                      console.log(JSON.stringify(formData, null, 2));
                    }}
                  />
                </View>
              </View>
            )}
            {activeIndex === 2 && (
              <View style={{ paddingHorizontal: 20, paddingVertical: 30 }}>
                <Text style={styles.stepTwoText}>Your order</Text>

                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 30,
                    borderBottomWidth: 1,
                    borderColor: '#678C96',
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        style={{
                          width: 70,
                          height: 70,
                          resizeMode: 'contain',
                        }}
                        source={require('../assets/bouquets/astrantia-bouquet.png')}
                      />
                      <View style={{ width: 170, marginLeft: 6 }}>
                        <Text
                          style={{
                            fontFamily: 'Overlock',
                            fontStyle: 'italic',
                            fontWeight: 700,
                            fontSize: 22,
                            lineHeight: 25,
                            color: colors.slateBlue,
                          }}
                        >
                          Custom bouquet
                        </Text>
                        <Text>vase type: {formData.vaseType}</Text>
                        <Text>flowers: {formData.flowers.join(', ')}</Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={{ alignItems: 'center' }}
                      onPress={() => console.log('sands')}
                    >
                      <SvgXml xml={recycleIcon} width={30} height={30} />
                      <Text
                        style={{
                          fontFamily: 'Overlock',
                          fontWeight: 700,
                          fontSize: 10,
                          lineHeight: 18,
                          textAlign: 'center',
                          color: 'rgba(0, 0, 0, 0.4)',
                        }}
                      >
                        Recycle
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{ flexDirection: 'row', paddingTop: 20, gap: 40 }}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        style={{
                          width: 25,
                          height: 25,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: colors.dustyRose,
                          borderTopLeftRadius: 15,
                          borderBottomLeftRadius: 15,
                        }}
                      >
                        <SvgXml xml={removeItem} height={15} width={15} />
                      </TouchableOpacity>
                      <Text
                        style={{
                          paddingHorizontal: 10,
                          fontFamily: 'Overlock',
                          fontStyle: 'italic',
                          fontWeight: 700,
                          fontSize: 15,
                          lineHeight: 25,
                        }}
                      >
                        1
                      </Text>
                      <TouchableOpacity
                        style={{
                          width: 25,
                          height: 25,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: colors.dustyRose,
                          borderTopRightRadius: 15,
                          borderBottomRightRadius: 15,
                        }}
                      >
                        <SvgXml xml={addItem} height={15} width={15} />
                      </TouchableOpacity>
                    </View>
                    <Button
                      buttonLabel={'Customize'}
                      bgColor={colors.dustyRose}
                      borderRadius={15}
                      additionalStyles={{
                        paddingVertical: 0,
                        marginVertical: 0,
                        minWidth: 100,
                      }}
                      onPress={() => {
                        setActiveIndex(0);
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingTop: 70,
                  }}
                >
                  <Text
                    style={{
                      color: colors.slateBlue,
                      fontFamily: 'Overlock',
                      fontStyle: 'italic',
                      fontWeight: 700,
                      fontSize: 16,
                      lineHeight: 32,
                    }}
                  >
                    Total:
                  </Text>
                  <Text
                    style={{
                      color: colors.slateBlue,
                      fontFamily: 'Overlock',
                      fontStyle: 'italic',
                      fontWeight: 700,
                      fontSize: 30,
                      lineHeight: 30,
                      marginLeft: 5,
                    }}
                  >
                    43.70€
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    marginRight: 20,
                    marginTop: 40,
                  }}
                >
                  <Button
                    buttonLabel="Back"
                    additionalStyles={{
                      minWidth: 100,
                    }}
                    textColor={colors.slateBlue}
                    onPress={() => setActiveIndex(activeIndex - 1)}
                  />
                  <Button
                    buttonLabel="Next step"
                    bgColor={colors.slateBlue}
                    textColor={colors.buttonText}
                    additionalStyles={{
                      minWidth: 100,
                    }}
                    borderRadius={5}
                    onPress={() => {
                      setActiveIndex(activeIndex + 1);
                      console.log(JSON.stringify(formData, null, 2));
                    }}
                  />
                </View>
              </View>
            )}
            {activeIndex === 3 && (
              <View style={{ padding: 20 }}>
                <Text style={styles.stepTwoText}>Delivery date</Text>
                <View style={{ width: 200 }}>
                  <Button
                    bgColor="rgba(103, 140, 150, 0.8)"
                    textColor={colors.buttonText}
                    additionalStyles={{ padding: 10 }}
                    buttonLabel="Select Date & Time of delivery"
                    fontSize={16}
                    onPress={showDateTimePicker}
                  />
                  <DateTimePickerModal
                    isVisible={showPicker}
                    mode="datetime"
                    date={formData.dateAndTime}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                  />
                  <Text
                    style={{
                      fontFamily: 'Overlock',
                      fontWeight: 700,
                      fontSize: 14,
                      lineHeight: 25,
                      color: colors.rust,
                    }}
                  >
                    Selected date:{' '}
                    {moment(formData.dateAndTime).format(
                      'dddd, MMMM Do YYYY, h:mm A'
                    )}
                  </Text>
                </View>

                <Text style={[styles.stepTwoText, { marginTop: 20 }]}>
                  Shipping address
                </Text>
                <TextInput
                  value={formData.streetAddress}
                  onChangeText={(value) =>
                    setFormData({ ...formData, streetAddress: value })
                  }
                  placeholder="Street Address"
                  style={{
                    borderWidth: 1,
                    borderColor: colors.rust,
                    padding: 10,
                    marginBottom: 10,
                  }}
                />
                <TextInput
                  value={formData.postalCode}
                  onChangeText={(value) =>
                    setFormData({ ...formData, postalCode: value })
                  }
                  placeholder="Postal Code"
                  style={{
                    borderWidth: 1,
                    borderColor: colors.rust,
                    padding: 10,
                    marginBottom: 10,
                  }}
                />
                <TextInput
                  value={formData.city}
                  onChangeText={(value) =>
                    setFormData({ ...formData, city: value })
                  }
                  placeholder="City"
                  style={{
                    borderWidth: 1,
                    borderColor: colors.rust,
                    padding: 10,
                    marginBottom: 10,
                  }}
                />
                <TextInput
                  value={formData.country}
                  editable={false}
                  style={{
                    borderWidth: 1,
                    borderColor: colors.rust,
                    padding: 10,
                    marginBottom: 10,
                    color: '#000',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    marginRight: 20,
                    marginTop: 10,
                  }}
                >
                  <Button
                    buttonLabel="Back"
                    additionalStyles={{
                      minWidth: 100,
                    }}
                    textColor={colors.slateBlue}
                    onPress={() => setActiveIndex(activeIndex - 1)}
                  />
                  <Button
                    buttonLabel="Finalize order"
                    bgColor={colors.slateBlue}
                    textColor={colors.buttonText}
                    additionalStyles={{
                      minWidth: 100,
                    }}
                    borderRadius={5}
                    onPress={() => {
                      // console.log(JSON.stringify(formData, null, 2));
                      const ordersRef = firebase
                        .firestore()
                        .collection('orders');
                      ordersRef
                        .add(formData)
                        .then(() => {
                          console.log('Order completed!');
                          Toast.show({
                            type: 'success',
                            text1: 'Order completed!',
                            text2: 'Make sure to check your email for details.',
                          });
                          resetForm();
                          setActiveIndex(0);
                        })
                        .catch((error) => {
                          console.log('Error occured: ', error);
                        });
                    }}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: 350,
    minHeight: '70%',
    maxHeight: '90%',
    backgroundColor: colors.babyPink,
    borderRadius: 20,
    shadowColor: '#678C96',
    elevation: 4,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: colors.dustyRose,
    borderWidth: 1,
    justifyContent: 'space-evenly',
  },
  titleWrapper: {
    paddingLeft: 10,
    paddingRight: 15,
  },
  formHeaderTitle: {
    color: colors.dustyRose,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 700,
  },
  formHeaderSubtitle: {
    color: colors.slateBlue,
    fontSize: 12,
    lineHeight: 18,
  },
  formHeaderIcon: {
    marginRight: 15,
  },
  activeIcon: {
    backgroundColor: colors.dustyRose,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    borderRadius: 50,
  },
  stepsWrapper: {
    width: '100%',
    height: '100%',
    marginBottom: 20,
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  selectPicker: {
    width: 315,
    backgroundColor: 'rgba(103, 140, 150, 0.8)',
    fontFamily: 'Overlock',
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: 5,
    color: 'rgb(255, 255, 255)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 6,
  },
  selectBoxLabel: {
    fontFamily: 'Overlock',
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 20,
    color: colors.slateBlue,
    marginBottom: 10,
  },
  selectBoxWrapper: {
    marginBottom: 40,
  },
  stepTwoText: {
    fontFamily: 'Overlock',
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 20,
    color: colors.slateBlue,
    marginBottom: 5,
  },
  textInput: {
    padding: 20,
    backgroundColor: colors.slateBlue,
    width: '80%',
    height: 300,
    color: colors.buttonText,
    textAlignVertical: 'top',
    fontFamily: 'Overlock',
    fontStyle: 'italic',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
  },
  dropdown: {
    height: 50,
    width: 315,
    backgroundColor: 'rgba(103, 140, 150, 0.8)',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
    color: colors.buttonText,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 10,
    marginRight: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 13,
  },
});

export default CreateBouquet;
