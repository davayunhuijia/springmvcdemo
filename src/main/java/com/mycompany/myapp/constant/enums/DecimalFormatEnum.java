package com.mycompany.myapp.constant.enums;


public enum DecimalFormatEnum {

    // 0=四舍五入留2位 1=遇小数进位 2=忽略 3=四舍五入留1位 4=舍去小数 5=四舍五入取整
    
    ROUND(0/*四舍五入*/),UP(1/*向上取整*/),IGNORE(2/*忽略不做处理*/), ROUND1(3 /*四舍五入保留1位*/), KEEP_INTEGER(4 /*舍去小数*/), ROUNDINT(5 /*四舍五入取整*/);
    
    private int value;
    
    private DecimalFormatEnum(int value){
	this.value = value;
    }
    
    public int getValue(){
	return value;
    }
    
    public static DecimalFormatEnum getByType(int value) {
	DecimalFormatEnum format = null;
	 switch (value) {
             case 0:
        	 format = ROUND;
                 break;
             case 1:
        	 format = UP;
                 break;
             case 2:
        	 format = IGNORE;
             case 3:
        	 format = ROUND1;
             case 4:
        	 format = KEEP_INTEGER;
             case 5:
        	 format = ROUNDINT;
             default:
                 break;
         }

        return format;
    }

    public static boolean isRoundInt(Byte type) {
	return type != null ? type.intValue() == ROUNDINT.getValue() : false;
    }
    
}
 