# 常见软件镜像设置

> 用于设置常用软件的国内镜像，以便加速下载资源。国内提供的[镜像站点](./)。

## 测速

系统软件源测速

```bash
curl -sSL https://cdn.jsdelivr.net/gh/lework/script/shell/os_repo_speed_test.sh | bash
```

Docker hub 测速

```bash
curl -sSL https://cdn.jsdelivr.net/gh/lework/script/shell/docker_hub_speed_test.sh | bash
```

## centos

```bash
sed -e 's!^#baseurl=!baseurl=!g' \
       -e  's!^mirrorlist=!#mirrorlist=!g' \
       -e 's!mirror.centos.org!mirrors.ustc.edu.cn!g' \
       -i  /etc/yum.repos.d/CentOS-Base.repo

yum install -y epel-release
sed -e 's!^mirrorlist=!#mirrorlist=!g' \
	-e 's!^#baseurl=!baseurl=!g' \
	-e 's!^metalink!#metalink!g' \
	-e 's!//download\.fedoraproject\.org/pub!//mirrors.ustc.edu.cn!g' \
	-e 's!http://mirrors\.ustc!https://mirrors.ustc!g' \
	-i /etc/yum.repos.d/epel.repo /etc/yum.repos.d/epel-testing.repo
```

## debain

```bash
cp /etc/apt/sources.list{,-bak}
cat > /etc/apt/sources.list <<EOF
deb http://mirrors.aliyun.com/debian/ stretch main
deb-src http://mirrors.aliyun.com/debian/ stretch main
deb http://mirrors.aliyun.com/debian/ stretch-updates main
deb-src http://mirrors.aliyun.com/debian/ stretch-updates main
deb http://mirrors.aliyun.com/debian-security stretch/updates main
deb-src http://mirrors.aliyun.com/debian-security stretch/updates main
EOF
apt-get update
```

也可以直接替换源

```bash
sudo sed -e 's/deb.debian.org/mirrors.163.com/g' \
  -e 's#security.debian.org#mirrors.163.com/debian-security#g' \
  -i /etc/apt/sources.list
```

## debian archive

debian 旧版本系统(2[hamm ]-7[wheezy])源都放在 debian-archive 中，

```
cp /etc/apt/sources.list{,-bak}
cat << EOF > /etc/apt/sources.list
deb http://mirrors.163.com/debian-archive/debian/ wheezy main non-free contrib
deb http://mirrors.163.com/debian-archive/debian/ wheezy-backports main non-free contrib
deb-src http://mirrors.163.com/debian-archive/debian/ wheezy main non-free contrib
deb-src http://mirrors.163.com/debian-archive/debian/ wheezy-backports main non-free contrib
deb http://mirrors.163.com/debian-archive/debian-security/ wheezy/updates main non-free contrib
deb-src http://mirrors.163.com/debian-archive/debian-security/ wheezy/updates main non-free contrib
EOF

apt-get -o Acquire::Check-Valid-Until=false update
```

## ubuntu

```bash
sudo sed -i 's/archive.ubuntu.com/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list
```

## alpine

```bash
sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
```

## freebsd

pkg 软件源

```bash
# /usr/local/etc/pkg/repos/FreeBSD.conf
FreeBSD: {
  url: "pkg+http://mirrors.ustc.edu.cn/freebsd-pkg/${ABI}/latest",
}

pkg update -f
```

ports 软件源

```bash
# /etc/make.conf

MASTER_SITE_OVERRIDE?=http://mirrors.ustc.edu.cn/freebsd-ports/distfiles/${DIST_SUBDIR}/
```

## pip

- 阿里云 https://mirrors.aliyun.com/pypi/simple
- 中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple
- 豆瓣(douban) http://pypi.douban.com/simple
- 清华大学 https://pypi.tuna.tsinghua.edu.cn/simple
- 中国科学技术大学 http://pypi.mirrors.ustc.edu.cn/simple

使用 pip 的时候在后面加上-i 参数，指定 pip 的下载源

```bash
pip install numpy -i https://mirrors.aliyun.com/pypi/simple
```

上面命令每次运行需要指定网址，可进行永久修改：

```bash
pip install pip -U
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

windows 下: 在 user 目录中创建一个 pip 目录，如：`C:\Users（用户）\xx\pip`，新建文件 pip.ini，内容如下

```bash
[global]
index-url = https://mirrors.aliyun.com/pypi/simple
```

linux 下: 修改 ~/.pip/pip.conf （如果没有自己创建一个）， 内容如下：

```bash
[global]
index-url = https://mirrors.aliyun.com/pypi/simple
```

## easy_install

```bash
cat >> ~/.pydistutils.cfg  <<EOF
[easy_install]
index-url = https://mirrors.aliyun.com/pypi/simple
EOF
```

## ruby

```bash
gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/
bundle config mirror.https://rubygems.org https://gems.ruby-china.com
```

## npm

```bash
npm config set registry https://registry.npm.taobao.org
npm config list
```

## yarn

```bash
yarn config set registry https://registry.npm.taobao.org
yarn config list
```

## go 代理

- https://mirrors.aliyun.com/goproxy/
- https://goproxy.io
- https://gorpoxy.cn

1. 使用 go1.11 以上版本并开启 go module 机制
2. 导出 GOPROXY 环境变量

```bash
export GO111MODULE=on
export GOPROXY=https://mirrors.aliyun.com/goproxy/
```

## jenkins

游览器访问 jenkins 例如 [http://localhost:8080/pluginManager/advanced]

修改为国内源 `https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json`

## docker-ce

**CentOS/RHEL**

```bash
curl -o /etc/yum.repos.d/docker-ce.repo https://mirrors.ustc.edu.cn/docker-ce/linux/centos/docker-ce.repo
sed -i 's#download.docker.com#mirrors.ustc.edu.cn/docker-ce#g' /etc/yum.repos.d/docker-ce.repo
```

**Debian**

```bash
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
sudo add-apt-repository \
   "deb [arch=amd64] http://mirrors.ustc.edu.cn/docker-ce/linux/debian \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install docker-ce
```

**Ubuntu**

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository \
   "deb [arch=amd64] https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install docker-ce
```

## docker

**docker 客户端**

> 指定`registry-mirrors`

- azure http://dockerhub.azk8s.cn
- tencent https://mirror.ccs.tencentyun.com
- daocloud http://f1361db2.m.daocloud.io
- netease http://hub-mirror.c.163.com
- ustc https://docker.mirrors.ustc.edu.cn
- aliyun https://2h3po24q.mirror.aliyuncs.com
- qiniu https://reg-mirror.qiniu.com

```bash
cp  /etc/docker/daemon.json{,-bak}
cat > /etc/docker/daemon.json <<EOF
{
    "log-driver": "json-file",
    "log-opts": {
        "max-size": "100m",
        "max-file": "3"
    },
    "live-restore": true,
    "max-concurrent-downloads": 10,
    "max-concurrent-uploads": 10,
    "storage-driver": "overlay2",
    "storage-opts": [
        "overlay2.override_kernel_check=true"
    ],
    "exec-opts": ["native.cgroupdriver=systemd"],
    "registry-mirrors": [
        "http://hub-mirror.c.163.com"
    ]
}
EOF
```

可以通过脚本进行测速在选择镜像站点

```bash
curl -sSL https://git.io/dspeed | bash
```

**docker.io 镜像加速**

```bash
docker pull dockerhub.azk8s.cn/library/centos
```

**gcr.io 镜像加速**

```bash
docker pull gcr.azk8s.cn/google_containers/kube-apiserver:v1.16.3
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver:v1.16.3
```

**quay.io 镜像加速**

```bash
docker pull quay.azk8s.cn/coreos/kube-state-metrics:v1.7.2
```

也可以使用脚本自动下载镜像

```bash
# 下载gcr镜像
curl -sSL https://git.io/getgcr | bash -s gcr.io/google_containers/kube-apiserver:v1.16.3

# 下载k8s镜像
curl -sSL https://git.io/getgcr | bash -s k8s.gcr.io/pause-amd64:3.1

# 指定k8s版本，下载全套件
curl -sSL https://git.io/getgcr | bash -s - -t v1.16.3

# 下载quay.io镜像
curl -sSL https://git.io/getgcr | bash -s quay.io/coreos/kube-state-metrics:v1.7.2
```

**docker HTTP/HTTPS 代理**

```bash
mkdir /etc/systemd/system/docker.service.d/

cat << EOF > /etc/systemd/system/docker.service.d/http-proxy.conf
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:8123/"
Environment="HTTPS_PROXY=https://127.0.0.1:8123/"
EOF

systemctl daemon-reload
systemctl restart docker
```

## containerd

**registry代理**

生成默认配置
```bash
containerd config default > /etc/containerd/config.toml
```

将registry.mirrors替换成代理的
```
    [plugins.cri.registry]
      [plugins.cri.registry.mirrors]
        [plugins.cri.registry.mirrors."docker.io"]
          endpoint = ["https://registry-1.docker.io"]
```

```bash
sed -i 's#https://registry-1.docker.io#https://docker.mirrors.ustc.edu.cn#g' /etc/containerd/config.toml
```

**http代理**

```
# /usr/lib/systemd/system/containerd.service
[Unit]
Description=containerd container runtime
Documentation=https://containerd.io
After=network.target

[Service]
ExecStartPre=-/sbin/modprobe overlay
ExecStart=/usr/bin/containerd
KillMode=process
Delegate=yes
LimitNOFILE=1048576
# Having non-zero Limit*s causes performance problems due to accounting overhead
# in the kernel. We recommend using cgroups to do container-local accounting.
LimitNPROC=infinity
LimitCORE=infinity
TasksMax=infinity
Environment="HTTP_PROXY=http://127.0.0.1:8123/"

[Install]
WantedBy=multi-user.target
```

## podman 

```bash
cp /etc/containers/registries.conf{,.bak}
cat > /etc/containers/registries.conf << EOF
unqualified-search-registries = ["docker.io"]

[[registry]]
prefix = "docker.io"
location = "uyah70su.mirror.aliyuncs.com"
EOF
```

## kubernetes

**Debian / Ubuntu**

```bash
apt-get update && apt-get install -y apt-transport-https
curl https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | apt-key add -
cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main
EOF
apt-get update
apt-get install -y kubelet kubeadm kubectl
```

**CentOS / RHEL / Fedora**

```bash
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
setenforce 0
yum install -y kubelet kubeadm kubectl
systemctl enable kubelet && systemctl start kubelet
```

## cygwin

选择 Install from Internet, 在”User URL”处输入以下地址：

`https://mirrors.tuna.tsinghua.edu.cn/cygwin/`

## maven

maven 的 `settings.xml`

```xml
<mirrors>
<mirror>
    <id>aliyunmaven</id>
    <mirrorOf>*</mirrorOf>
    <name>阿里云公共仓库</name>
    <url>https://maven.aliyun.com/repository/public</url>
</mirror>
</mirrors>
```

maven 项目的`pom.xml`

```xml
<repositories>
    <repository>
        <id>nexus-163</id>
        <name>Nexus 163</name>
        <url>http://mirrors.163.com/maven/repository/maven-public/</url>
        <layout>default</layout>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
        <releases>
            <enabled>true</enabled>
        </releases>
    </repository>
</repositories>
<pluginRepositories>
    <pluginRepository>
        <id>nexus-163</id>
        <name>Nexus 163</name>
        <url>http://mirrors.163.com/maven/repository/maven-public/</url>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
        <releases>
            <enabled>true</enabled>
        </releases>
    </pluginRepository>
</pluginRepositories>
```

## gradle

`build.gradle` 文件

```
allprojects {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/public/' }
        mavenLocal()
        mavenCentral()
    }
}
```

## NuGet

选择工程-》NuGet 包管理器-》程序包管理器设置

```
https://nuget.cdn.azure.cn/v3/index.json
https://repo.huaweicloud.com/repository/nuget/v3/index.json
```

## Hex

```
export HEX_MIRROR="https://hexpm.upyun.com"
export HEX_CDN="https://hexpm.upyun.com"
```

## github 代理

> 仅限访问和下载，请不要提交账号信息，需保护自己的隐私。

```
https://gh.lework.workers.dev  # 对github clone、release、archive以及项目文件进行加速
https://github.com.cnpmjs.org  # 代理访问github站点
```

## 前端开源项目 CDN

- https://www.jsdelivr.com/
- https://www.bootcdn.cn/
- https://cdnjs.com/
- http://www.staticfile.org/
- http://jscdn.upai.com
- https://cdn.baomitu.com/

