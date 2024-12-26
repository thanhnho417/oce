fin = 'input.txt'
fout = 'output.txt'
def layfile(fin):
    f = open(fin, 'r', encoding = 'utf-8')
    A = []
    for line in f.readlines():
        A.append(line)
    x = A[-1]
    A.remove(A[-1])
    f.close()
    return A,x

def xulitufile1(A,x):
    B = []
    for i in A:
        y = i.split(x)
        B.append("".join(y)) 
    return B
def ghiDL(fout,B):
    f = open(fout, 'w', encoding = 'utf-8')
    for i in B:
        print(i, file = f)
    f.close()


def xulinhapvanban():
    print('Nhập văn bản')
    n = str(input("Văn bản: "))
    x = str(input("Kí tự cần tách để gộp: "))
    y = n.split(x)
    h = "".join(y)
    return h


print('CHƯƠNG TRÌNH GỘP VĂN BẢN')
while True:
    print('Bạn muốn làm gì: \n [1] Gộp văn bản \n [2] Tách văn bản \n [3] Thoát')
    n = int(input('Lựa chọn: '))
    if n  == 1:
        print('Bạn muốn gộp từ đâu: \n[1] File \n[2] Nhập từ bàn phím \n[3] Trở lại')
        a = int(input('Lựa chọn: '))
        if a == 1:
            A,x = layfile(fin)
            B = xulitufile1(A,x)
            ghiDL(fout,B)
            print('Thành công. Vui lòng xem file có tên output.txt')
        elif a == 2:
            h = xulinhapvanban()
            print('Văn bản sau khi gộp: ', h)
    else:
        quit()