import Block from '../components/Block';
import Card from '../components/Card';
import CsImage from '../components/cs/Image';
import CsLine from '../components/cs/Line';
import CsLink from '../components/cs/Link';
import CsText from '../components/cs/Text';
import CsTitle from '../components/cs/Title';
import CsTrigger from '../components/cs/Trigger';

export default function HelpView({
   setView,
}: {
   setView: (view: string) => void;
}) {
   return (
      <Card className='w-[570px] space-y-4 my-4 mt-16 md:mt-4'>
         <CsLine className='items-center'>
            <CsTrigger
               onclick={() => setView('usage')}
               className='size-9 p-0 flex items-center 
                  justify-center'>
               <i className='fas fa-caret-left mt-[1px]'></i>
            </CsTrigger>
            <CsTitle className='text-xl md:text-2xl'>帮助</CsTitle>
         </CsLine>
         <Block className='space-y-4'>
            <CsTitle>
               <i className='fas fa-circle-question mr-2'></i>
               如何申请免费的 API Key 和 APP Secret ？
            </CsTitle>
            <CsText className='space-y-2'>
               <p>
                  API Key 和 Secret
                  Key的获取是完全免费的，包括使用的Api也是免费的👍👍👍
               </p>
               <p>
                  首先打开
                  <CsLink href='https://console.bce.baidu.com/qianfan/ais/console/applicationConsole/application/v1'>
                     百度智能云 | 应用接入
                  </CsLink>
               </p>
               <p>
                  点击创建应用，随便填写应用名称和应用描述，然后点击创建应用；
               </p>
               <p>
                  接着回到刚刚的页面，你就可以看到 API Key 和 Secret Key
                  了，复制下来，填入应用即可；
               </p>
            </CsText>
         </Block>
         <Block className='space-y-4'>
            <CsTitle>
               <i className='fas fa-circle-question mr-2'></i>
               如何使用该应用 ？
            </CsTitle>
            <CsText className='space-y-2'>
               <p>
                  1. 首先去往设置界面，填入你的 API Key 和 Secret Key；
                  <CsImage src='https://cos1-1322468699.cos.ap-guangzhou.myqcloud.com/img/202408171708941.png' />
               </p>
               <p>
                  2.
                  来到功能界面，在顶上输入你想要生成数据的属性名、属性类型和描述；
                  <CsImage src='https://cos1-1322468699.cos.ap-guangzhou.myqcloud.com/img/202408171637423.png' />
               </p>
               <p>
                  3. 设置需要生成数据的数量；
                  <CsImage src='https://cos1-1322468699.cos.ap-guangzhou.myqcloud.com/img/202408171638438.png' />
               </p>
               <p>
                  4.
                  点击生成数据，等待生成即可；可以对生成的数据进行修改和复制；
                  <CsImage src='https://cos1-1322468699.cos.ap-guangzhou.myqcloud.com/img/202408171638317.png' />
               </p>
               <p>从此再也不用忍受不合心意的模拟数据了😋！</p>
            </CsText>
         </Block>
         <Block className='space-y-4'>
            <CsTitle>
               <i className='fas fa-circle-question mr-2'></i>
               怎么会想到开发这个 ？
            </CsTitle>
            <CsText className='space-y-2'>
               <p>
                  最开始要生成一大堆马卡龙色彩，于是想到用AI辅助生成，但是问AI还是有点麻烦，于是就想到做这个来将生成精确mock的操作便利化。
               </p>
            </CsText>
         </Block>
         <Block className='space-y-4'>
            <CsTitle>
               <i className='fas fa-circle-question mr-2'></i>
               出现 bug 和莫名其妙的问题 ？
            </CsTitle>
            <CsText className='space-y-2'>
               <p>
                  那就发邮件给站长吧：
                  <CsLink href='https://mail.qq.com'>951040628@qq.com</CsLink>
               </p>
            </CsText>
         </Block>
      </Card>
   );
}
