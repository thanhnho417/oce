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
    print('Bạn muốn gộp bao nhiêu câu/đoạn')
    m = int(input('Nhập vào đây: '))   
    i = 1
    A = []
    B = []
    while i <= m:
        print('Nhập câu/đoạn thứ', i)
        n = str(input('Nhập vào đây: '))
        A.append(n)
        i += 1
    x = str(input("Kí tự cần tách để gộp: "))
    k = 0
    while k < len(A):
        u = A[k].split(x)
        B.append("".join(u))
        k += 1
    return B


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
            print('________________________________________________')
            print('Văn bản sau khi gộp:')
            for i in h:
                print(i)
            print('________________________________________________')
    else:
        quit()