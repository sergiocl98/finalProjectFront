import { extendTheme } from '@chakra-ui/react';
import { multiColorFilledTrack, multiSegmentFilledTrack } from './Progress/progress';

const DiningRoomTheme = extendTheme({
  config:{
    initialColorMode: 'light'
  },
  colors: {
    background: '#F5F6FA',
    brand:{
      primary: '#F26E02',
      primaryDark: '#0E2A67',
      primary10:'rgba(40, 115, 184, 0.1)',
      primary20:'rgba(40, 115, 184, 0.2)',
      primaryHover: '#335b97',
      secondary: '#288484',
      secondaryDark: '#174D4C',
      tertiary: '#EFC650',
      gray1: '#2F3341',
      gray2:'#696C78',
      gray3:'#ACAEB4',
      gray4:'#D6D8DD',
      gray5:'#F5F6FA',
      purple: '#9129B8',
      green: '#086F6E',
      greenDark: '#78AE3A'
    }
  },
  fonts: {
    heading: 'Mulish',
    body: 'Mulish',
  },
  fontSizes: {},
  textStyles: {
    h1: {
      fontSize: '40px'
    },
    h2: {
      fontSize: '32px'
    },
    h3: {
      fontSize: '28px',
      fontWeight: '400'
    },
    h4: {
      fontSize: '24px'
    },
    h5: {
      fontSize: '20px'
    },
    p: {
      fontSize: '16px'
    },
    small: {
      fontSize: '10px'
    },
  },
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
  },
  shadows: {
    outline: 'none',
  },
  components:{
    Alert:{
      variants: {
        agent: {
          container: {
            bgColor: 'brand.primary',
            color: 'white'
          },
        },
        lender: {
          container: {
            bgColor: 'brand.green',
            color: 'white'
          },
        },
        lenders: {
          container: {
            bgColor: 'brand.green',
            color: 'white'
          },
        },
        borrower: {
          container: {
            bgColor: 'brand.purple',
            color: 'white'
          },
        },
      }
    },
    Button:{
      baseStyle: {
        _focus: { boxShadow: 'none' }
      },
      variants: {
        primary:{
          bg:'brand.primary',
          color: 'white',
          borderRadius: '9px',
          fontWeight: '500',
          _hover:{
            bg:'brand.primaryHover',
            _disabled: {
              bgColor: 'brand.primaryHover',
            },
          }
        },
        secondary:{
          bg:'bg',
          color: 'brand.primary',
          borderRadius: '9px',
          fontWeight: '500',
          borderColor: 'brand.primary',
          borderWidth: '1px',
          borderStyle: 'solid',
          _hover:{
            bg:'#bddfff',
          }
        },
        secondary2:{
          bg:'bg',
          color: 'brand.primary',
          borderRadius: '9px',
          fontWeight: '500',
          borderColor: 'brand.primary',
          borderWidth: '2px',
          borderStyle: 'solid',
          _hover:{
            bg:'#bddfff',
          }
        },
        cancel:{
          bg:'#E62A10',
          color: 'white',
          borderRadius: '9px',
          fontWeight: '500',
          borderColor: '#E62A10',
          borderWidth: '2px',
          borderStyle: 'solid',
          _hover:{
            bg:'#c22f1b',
            borderColor: '#c22f1b',
            _disabled:{
              bg:'#E62A10'
            }
          },
        },
        selection: {
          bg: 'transparent',
          color:'brand.gray3',
          borderRadius: '2px',
          borderColor: 'brand.gray3',
          borderWidth: '1px',
          _hover: {
            borderColor: 'brand.primary20',
            color: 'brand.primary20'
          }
        },
        gray5:{
          bg:'brand.gray5',
          color: 'brand.gray3',
          borderRadius: '9px',
          fontWeight: '500',
          _hover:{
            bg:'brand.gray4'
          }
        },
        seePassword:{
          bg:'transparent',
          borderColor: '#e2e8f0',
          borderWidth: '1px',
          _hover:{
            bg:'white',
          }
        },
        goBack:{
          bg:'bg',
          color:'brand.gray2',
          fontSize:'14px',
          _hover:{
            textDecoration:'underline'
          }
        },
        confirmGreen:{
          bg:'#8BC34A',
          w:'100%',
          color: 'white',
          borderRadius: '9px',
          fontWeight: '500',
          _hover:{
            bg:'#709644',
            _disabled: {
              bgColor: '#8BC34A',
            },
            _loading: {
              bgColor: '#8BC34A',
            }
          }
        },
        denegateRed:{
          bg:'#E62A10',
          w:'100%',
          color: 'white',
          borderRadius: '9px',
          fontWeight: '500',
          _hover:{
            bg:'#ad3323',
            _disabled: {
              bgColor: '#E62A10',
            },
          }
        },
      },
    },
    IconButton:{
      baseStyle: {
        bg: 'bg',
        _focus: { boxShadow: 'none' }
      },
    },
    Checkbox:{
      baseStyle: {
        control:{
          bg: 'bg',
          borderColor: '#CACACA'
        },
        _focus: { boxShadow: '0px' },
        borderWidth:'3px'
      },
    },
    Tabs:{
      variants:{
        information:{
          tab:{
            borderBottom:'2px solid',
            borderBottomColor:'brand.gray4', 
            _selected:{
              borderBottom:'2px solid',
              borderBottomColor:'brand.primary', 
              _focus:{ 
                boxShadow:'none'
              } 
            }
          }
        }
      }
    },
    Table:{
      variants:{
        global:{
          table:{
            color:'brand.gray2'
          },
          thead:{
            borderBottom:'3px solid',
            borderBottomColor:'brand.gray3',
            tr:{
              background:'none',
              th:{
                color:'brand.gray1',
                fontWeight:'700'
              }
            }
          },
          tbody:{
            tr:{
              _hover:{
                cursor:'pointer',
                background:'brand.primary10',
                borderLeft:'4px solid',
                borderLeftColor: 'brand.primary'
              },
              _even:{
                background:'brand.gray5',
                _hover:{
                  background:'brand.primary10',
                  borderLeft:'4px solid',
                  borderLeftColor: 'brand.primary'
                },
              }
            }
          }
        },
        subTable:{
          table:{
            color:'brand.gray2'
          },
          thead:{
            borderBottom:'2px solid',
            borderBottomColor:'brand.gray4',
            tr:{
              background:'none',
              th:{
                color:'brand.gray1',
                fontWeight:'700',
                fontSize: '12px',
              }
            }
          },
          tbody:{
            fontSize: '14px',
            tr:{
              _even:{
                background:'brand.gray5',
              }
            }
          },
          tfoot:{
            fontSize: '14px'
          }
        },
        list:{
          table:{
            color:'brand.gray2'
          },
          thead:{
            borderBottom:'2px solid',
            borderBottomColor:'brand.gray4',
            tr:{
              background:'none',
              th:{
                color:'brand.gray1',
                fontWeight:'700',
                fontSize: '12px',
                textTransform: 'none'
              }
            }
          },
          tbody:{
            fontSize: '14.5px',
            tr:{
              borderLeft:'5px solid',
              borderLeftColor: 'transparent',
              _hover:{
                background:'brand.primary10',
                borderLeft:'5px solid',
                borderLeftColor: 'brand.primary'
              },
              _even:{
                background:'brand.gray5',
                _hover:{
                  background:'brand.primary10',
                  borderLeft:'5px solid',
                  borderLeftColor: 'brand.primary'
                },
              }
            }
          },
          tfoot:{
            fontSize: '14px'
          }
        },
        information:{
          table:{
            color:'brand.gray2'
          },
          thead:{
            borderBottom:'2px solid',
            borderBottomColor:'brand.gray4',
            tr:{
              background:'none',
              th:{
                color:'brand.gray1',
                fontWeight:'700',
                fontSize: '12px',
                textTransform: 'none'
              }
            }
          },
          tbody:{
            fontSize: '14.5px',
            tr:{
              borderLeft:'5px solid',
              borderLeftColor: 'transparent',
              _even:{
                background:'brand.gray5',
              }
            }
          },
          tfoot:{
            fontSize: '14px'
          }
        },
        periods:{
          table:{
            color:'brand.gray2'
          },
          thead:{
            borderBottom:'2px solid',
            borderBottomColor:'brand.gray4',
            tr:{
              background:'none',
              th:{
                color:'brand.gray1',
                fontWeight:'700',
                fontSize: '14px',
                textTransform: 'none'
              }
            }
          },
          tbody:{
            fontSize: '14px',
            tr:{
              borderLeft:'5px solid',
              borderLeftColor: 'transparent',
              _even:{
                background:'brand.gray5',
              }
            }
          },
          tfoot:{
            th: {
              textTransform: 'capitalize',
              fontSize: '14px',
              fontWeight: '500',
              color: 'brand.gray2',
              letterSpacing: '0'
            }
          }
        }
      }
    },
    Progress: {
      variants: {
        multiColor: (props) => ({
          filledTrack: multiColorFilledTrack(props),
        }),
        multiSegment: (props) => ({
          filledTrack: multiSegmentFilledTrack(props),
        }),
      },
    },
  }
});

export default DiningRoomTheme;