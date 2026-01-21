#include <iostream>
using namespace std;
int main() {
    string s="Hello";
    //string rev="";
    // for(int i=s.length()-1;i>=0;i--){
    //     rev+=s[i];
    // }
    for(int i=0;i<s.length()/2;i++){
     swap(s[i],s[s.length()-1-i]);
    }
    cout << "reverse is :" << s << endl;
    return 0;
}